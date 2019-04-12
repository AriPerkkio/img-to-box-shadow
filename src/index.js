const fs = require('fs');
const PNG = require('pngjs').PNG;

const cellToShadow = ({ x, y, rgba }) => `${x}px ${y}px 0 ${rgba}`;

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

        // TODO options.useCssVariables:
        // - Reduce size of output by mapping box-shadow values to css variables
        rows.push(cells.map(cellToShadow).join(','));
    }

    return rows;
};

const PngToBoxShadow = (options = {}, callback) =>
    fs
        .createReadStream(options.fileName)
        .pipe(new PNG())
        .on('parsed', function() {
            try {
                const rows = getRows(this.data, options);
                const output = rows.join(',');

                callback(null, output);
            } catch (e) {
                callback(e);
            }
        });

module.exports = PngToBoxShadow;
