const PNG = require('png-js');

const decToHex = dec => {
    const hex = dec.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
};

const getRows = (data, options) => {
    const { width, ratio } = options;

    const rows = [];
    const rowSliceLength = width * 4;

    for (let i = 0; i < data.length; i += rowSliceLength) {
        const row = data.slice(i, i + rowSliceLength);
        const cells = [];

        for (let x = 0; x < row.length; x += 4) {
            const [r, g, b] = row.slice(x, x + 4);
            const hexColor = `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`;

            cells.push(
                `${(x / 4) * ratio}px ${rows.length * ratio}px 0 ${hexColor}`
            );
        }

        rows.push(cells.join(', '));
    }

    return rows;
};

const PngToBoxShadow = (options = {}, callback) => {
    try {
        PNG.decode(options.fileName, data => {
            try {
                const rows = getRows(data, options);
                const output = rows.join(',\n');

                callback(null, output);
            } catch (e) {
                callback(e);
            }
        });
    } catch (e) {
        callback(e);
    }
};

module.exports = PngToBoxShadow;
