const fs = require('fs');
const PNG = require('pngjs').PNG;
const transformCssVariables = require('./transformCssVariables');

const toPx = val => (val === 0 ? 0 : `${val}px`);
const cellToShadow = ({ x, y, rgba }) => `${toPx(x)} ${toPx(y)} 0 ${rgba}`;
const rowsToShadow = rows =>
    rows
        .reduce((all, row) => [...all, row.map(cellToShadow).join(',')], [])
        .join();

const getRows = (data, options) => {
    const { width, ratio, useCssVariables } = options;
    const rows = [];
    const rowSliceLength = width * 4;

    for (let i = 0; i < data.length; i += rowSliceLength) {
        const pixelRow = data.slice(i, i + rowSliceLength);
        const row = [];

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

    if (options.useCssVariables) {
        const { cssVariables, transformedRows } = transformCssVariables(rows);
        const boxShadow = rowsToShadow(transformedRows);

        return { boxShadow, cssVariables };
    } else {
        return { boxShadow: rowsToShadow(rows) };
    }
};

const PngToBoxShadow = (options = {}, callback) =>
    fs
        .createReadStream(options.fileName)
        .pipe(new PNG())
        .on('parsed', function() {
            try {
                const { boxShadow, cssVariables } = getRows(this.data, options);

                callback(null, { boxShadow, cssVariables });
            } catch (e) {
                callback(e);
            }
        });

module.exports = PngToBoxShadow;
