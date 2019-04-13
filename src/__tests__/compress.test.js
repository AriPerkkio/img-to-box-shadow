const compress = require('../compress');

const cells = [
    { x: 0, y: 0, rgba: 'rgba(0,0,0, 1)' },
    { x: 1, y: 0, rgba: 'rgba(255,255,255, 1)' },
    { x: 2, y: 0, rgba: 'rgba(0,0,0, 1)' },
    { x: 3, y: 0, rgba: 'rgba(255,255,255, 1)' },
    { x: 0, y: 1, rgba: 'rgba(255,255,0, 1)' },
    { x: 1, y: 1, rgba: 'rgba(255,0,255, 1)' },
    { x: 2, y: 1, rgba: 'rgba(255,255,0, 1)' },
    { x: 3, y: 1, rgba: 'rgba(255,0,255, 1)' },
];

describe('compress', () => {
    it('should map rgba values to css variables and create new rgba to css var map', () => {
        const { cssVariables, compressedCells } = compress(cells, {});

        expect(cssVariables).toEqual({
            'rgba(0,0,0, 1)': '--var(a)',
            'rgba(255,255,255, 1)': '--var(b)',
            'rgba(255,255,0, 1)': '--var(c)',
            'rgba(255,0,255, 1)': '--var(d)',
        });

        expect(compressedCells).toEqual([
            { x: 0, y: 0, rgba: '--var(a)' },
            { x: 1, y: 0, rgba: '--var(b)' },
            { x: 2, y: 0, rgba: '--var(a)' },
            { x: 3, y: 0, rgba: '--var(b)' },
            { x: 0, y: 1, rgba: '--var(c)' },
            { x: 1, y: 1, rgba: '--var(d)' },
            { x: 2, y: 1, rgba: '--var(c)' },
            { x: 3, y: 1, rgba: '--var(d)' },
        ]);
    });
});
