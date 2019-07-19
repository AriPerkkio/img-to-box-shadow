import { BoxShadow, Options, RawPng } from './types/PngToBoxShadow';

import fs from 'fs';
import {PNG} from 'pngjs';
import transformCssVariables from './transformCssVariables');

const toPx = (val: number) => (val === 0 ? 0 : `${val}px`);
const cellToShadow = (cell: BoxShadow) =>
    `${toPx(cell.x)} ${toPx(cell.y)} 0 ${cell.rgba}`;
const rowsToShadow = (rows: any) =>
    rows
        .reduce(
            (all: any[string], row: any) => [
                ...all,
                row.map(cellToShadow).join(','),
            ],
            []
        )
        .join();

const getRows = (data: RawPng[], options: Options) => {
    const { width, ratio, useCssVariables } = options;
    const rows: any[any] = [];
    const rowSliceLength = width * 4;

    for (let i = 0; i < data.length; i += rowSliceLength) {
        const pixelRow = data.slice(i, i + rowSliceLength);
        const row: BoxShadow[] = [];

        for (let x = 0; x < pixelRow.length - 4; x += 4) {
            const [r, g, b, a] = pixelRow.slice(x, x + 4);

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
    callback: (
        a: Error,
        b?: { boxShadow: string; cssVariables: string }
    ) => void
): void =>
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

module.exports = PngToBoxShadow;
