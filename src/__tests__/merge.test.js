const { mergeHorizontal } = require('../merge');

const cell = (x, y, rgba) => ({ x, y, rgba });
const cells = [
    cell(0, 0, 'rgba1'),
    cell(1, 0, 'rgba1'),
    cell(2, 0, 'rgba2'),
    cell(3, 0, 'rgba1'),
    cell(4, 0, 'rgba1'),
    cell(5, 0, 'rgba1'),
    cell(6, 0, 'rgba1'),
    cell(7, 0, 'rgba2'),
    cell(8, 0, 'rgba2'),
    cell(9, 0, 'rgba2'),
];

describe('Merge', () => {
    describe('mergeHorizontal', () => {
        it('should merge cells horizontally', () => {
            const mergedCells = mergeHorizontal(cells);

            expect(mergedCells).toEqual([
                cell(1, 0, 'rgba1'),
                cell(2, 0, 'rgba2'),
                cell(6, 0, 'rgba1'),
                cell(9, 0, 'rgba2'),
            ]);
        });
    });

    describe('mergeVertical', () => {
        it('should...', () => {
            expect(true).toBe(true);
        });
    });
});
