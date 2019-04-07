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

const mergeVertical = rows => rows;

module.exports = {
    mergeHorizontal,
    mergeVertical,
};
