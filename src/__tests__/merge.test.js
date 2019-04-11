const { mergeHorizontal, mergeVertical } = require('../merge');

const colorOne = 'colorOne';
const colorTwo = 'colorTwo';

const cell = (x, y, rgba) => ({ x, y, rgba });
const cells = [
    cell(0, 0, colorOne),
    cell(1, 0, colorOne),
    cell(2, 0, colorTwo),
    cell(3, 0, colorOne),
    cell(4, 0, colorOne),
    cell(5, 0, colorOne),
    cell(6, 0, colorOne),
    cell(7, 0, colorTwo),
    cell(8, 0, colorTwo),
    cell(9, 0, colorTwo),
];

const rows = [
    [cell(0, 0, colorOne), cell(1, 0, colorOne)],
    [cell(0, 1, colorTwo), cell(1, 1, colorOne)],
    [cell(0, 2, colorTwo), cell(1, 2, colorTwo)],
];

describe('Merge', () => {
    describe('mergeHorizontal', () => {
        it('should merge cells horizontally', () => {
            const mergedCells = mergeHorizontal(cells);

            expect(mergedCells).toEqual([
                cell(1, 0, colorOne),
                cell(2, 0, colorTwo),
                cell(6, 0, colorOne),
                cell(9, 0, colorTwo),
            ]);
        });
    });

    describe('mergeVertical', () => {
        it('should merge cells vertically', () => {
            const mergedRows = mergeVertical(rows);

            expect(mergedRows).toEqual([
                [cell(0, 0, colorOne), cell(1, 1, colorOne)],
                [cell(0, 2, colorTwo), null],
                [null, cell(1, 2, colorTwo)],
            ]);
        });
    });
});
