const PNG = require('png-js');

const cellToShadow = ({ x, y, rgba }) => `${x}px ${y}px 0 ${rgba}`;

const mergeHorizontal = cells => {
    const mergedCells = [];
    const lastIndex = cells.length - 1;

    for (let y = 0; y < cells.length; y++) {
        const left = cells[y];
        const color = left.rgba;
        const isLast = y === lastIndex;

        if (isLast || color !== cells[y + 1].rgba) {
            mergedCells.push(left);
            continue;
        }

        let x = 0 + left.x;
        while (y < lastIndex && color === cells[y + 1].rgba) {
            y++;
            x++;
        }

        mergedCells.push({ ...left, x });
    }

    return mergedCells;
};

const getRows = (data, options) => {
    const { width, ratio } = options;
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

        const mergedCells = mergeHorizontal(cells);
        // TODO merge vertically
        // TODO threshold for merging pixels

        rows.push(mergedCells.map(cellToShadow).join(',\n'));
    }

    return rows;
};

const PngToBoxShadow = (options = {}, callback) =>
    PNG.decode(options.fileName, data => {
        try {
            const rows = getRows(data, options);
            const output = rows.join(',\n');

            callback(null, output);
        } catch (e) {
            callback(e);
        }
    });

module.exports = {
    PngToBoxShadow,
    mergeHorizontal,
};
