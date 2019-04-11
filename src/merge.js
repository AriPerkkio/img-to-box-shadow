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
            y++, x++;
        }

        mergedCells.push({ ...left, x });
    }

    return mergedCells;
};

const mergeVertical = rows => {
    const maxRowLength = Math.max(...rows.map(r => r.length));
    const mergedRows = createEmptyClone(rows);
    const lastIndex = rows.length - 1;

    for (let x = 0; x < maxRowLength; x++) {
        for (let y = 0; y < rows.length; y++) {
            const upper = rows[y][x];

            if (!upper) continue;

            const color = upper.rgba;
            const isLast = y === lastIndex;
            const initialY = 0 + y;

            if (isLast || color != (rows[y + 1][x] || {}).rgba) {
                mergedRows[y][x] = { ...upper };
                continue;
            }

            let upperY = 0 + upper.y;
            while (y < lastIndex && color === (rows[y + 1][x] || {}).rgba) {
                mergedRows[y][x] = null;
                y++, upperY++;
            }

            mergedRows[initialY][x] = { ...upper, y: upperY };
        }
    }

    return mergedRows;
};

const createEmptyClone = array =>
    JSON.parse(
        JSON.stringify(
            new Array(array.length).fill(
                new Array(Math.max(...array.map(r => r.length)))
            )
        )
    );

const debugRows = (rows, label = '') => {
    const printRows = createEmptyClone(rows);

    rows.map((row, x) =>
        row.map((cell, y) => {
            printRows[x][y] = cell && cell.rgba;
        })
    );

    const output = `${label}
            \n${printRows
                .map(row => row.map(color => `[${color}]`).join('\t'))
                .map((colors, y) => `Y${y}\t${colors}`)
                .join('\n')}`;

    console.log(output);
    return output;
};

module.exports = {
    mergeHorizontal,
    mergeVertical,
};
