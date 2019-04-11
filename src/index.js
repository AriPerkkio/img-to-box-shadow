const PNG = require('png-js');
const { mergeHorizontal, mergeVertical } = require('./merge');

const cellToShadow = ({ x, y, rgba }) => `${x}px ${y}px 0 ${rgba}`;
const isDefined = val => val;
const formatCell = cell =>
    cell
        .filter(isDefined)
        .map(cellToShadow)
        .join(',\n');

const getRows = (data, options) => {
    const { width, ratio, compress } = options;
    const rows = [];
    const rowSliceLength = width * 4;

    for (let i = 0; i < data.length; i += rowSliceLength) {
        const row = data.slice(i, i + rowSliceLength);
        const cells = [];

        for (let x = 0; x < row.length - 4; x += 4) {
            const [r, g, b, a] = row.slice(x, x + 4);

            cells.push({
                x: (x / 4) * ratio,
                y: rows.length * ratio,
                rgba: `rgba(${r},${g},${b},${a})`,
            });
        }

        rows.push(compress ? mergeHorizontal(cells) : cells);
    }

    return (compress ? mergeVertical(rows) : rows)
        .map(formatCell)
        .filter(isDefined);
};

const PngToBoxShadow = (options = {}, callback) =>
    PNG.decode(options.fileName, data => {
        try {
            const rows = getRows(data, options);
            const output = rows.join(',');

            callback(null, output);
        } catch (e) {
            callback(e);
        }
    });

module.exports = PngToBoxShadow;
