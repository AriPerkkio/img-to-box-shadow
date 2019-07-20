import fs from 'fs';
import { PNG } from 'pngjs';

import transformCssVariables from './transformCssVariables';

const toPx = (val: number): string | number => (val === 0 ? 0 : `${val}px`);
const cellToShadow = (cell: BoxShadow): string =>
    `${toPx(cell.x)} ${toPx(cell.y)} 0 ${cell.rgba}`;

const rowsToShadow = (rows: BoxShadow[][]): string =>
    rows
        .reduce(
            (all: string[], row: BoxShadow[]): string[] => [
                ...all,
                row.map(cellToShadow).join(','),
            ],
            []
        )
        .join();

const getRows = (data: number[], options: Options): Result => {
    const { width, ratio, useCssVariables } = options;
    const rows: BoxShadow[][] = [];
    const rowSliceLength: number = width * 4;

    for (let i = 0; i < data.length; i += rowSliceLength) {
        const pixelRow: number[] = data.slice(i, i + rowSliceLength);
        const row: BoxShadow[] = [];

        for (let x = 0; x < pixelRow.length - 4; x += 4) {
            const pixel: number[] = pixelRow.slice(x, x + 4);
            const [r, g, b, a] = pixel;

            row.push({
                x: (x / 4) * ratio,
                y: rows.length * ratio,
                rgba: `rgba(${r},${g},${b},${a})`,
            });
        }

        rows.push(row);
    }

    if (useCssVariables) {
        const { cssVariables, transformedRows } = transformCssVariables(rows);
        const boxShadow = rowsToShadow(transformedRows);

        return { boxShadow, cssVariables };
    } else {
        return { boxShadow: rowsToShadow(rows) };
    }
};

const PngToBoxShadow = (
    options: Options,
    callback: (a: Error, b?: Result) => void
): PNG =>
    fs
        .createReadStream(options.fileName)
        .pipe(new PNG())
        .on('parsed', function(): void {
            try {
                const { boxShadow, cssVariables } = getRows(this.data, options);

                callback(null, { boxShadow, cssVariables });
            } catch (e) {
                callback(e);
            }
        });

export default PngToBoxShadow;
