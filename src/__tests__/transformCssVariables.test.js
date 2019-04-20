const transformCssVariables = require('../transformCssVariables');

const red = 'rgba(255,0,0,0)';
const green = 'rgba(0,255,0,0)';
const blue = 'rgba(0,0,255,0)';
const white = 'rgba(255,255,255,0)';
const black = 'rgba(0,0,0,0)';

const rows = [
    [
        { x: 0, y: 0, rgba: red },
        { x: 1, y: 0, rgba: green },
        { x: 2, y: 0, rgba: blue },
        { x: 3, y: 0, rgba: white },
    ],
    [
        { x: 0, y: 1, rgba: black },
        { x: 1, y: 1, rgba: black },
        { x: 2, y: 1, rgba: black },
        { x: 3, y: 1, rgba: black },
    ],
    [
        { x: 0, y: 2, rgba: red },
        { x: 1, y: 2, rgba: blue },
        { x: 2, y: 2, rgba: red },
        { x: 3, y: 2, rgba: red },
    ],
];

describe('transformCssVariables', () => {
    it("should transform rows' RGBAs to CSS variables", () => {
        const { cssVariables, transformedRows } = transformCssVariables(rows);

        expect(transformedRows).toEqual([
            [
                { x: 0, y: 0, rgba: 'var(--a)' },
                { x: 1, y: 0, rgba: green },
                { x: 2, y: 0, rgba: 'var(--b)' },
                { x: 3, y: 0, rgba: white },
            ],
            [
                { x: 0, y: 1, rgba: 'var(--c)' },
                { x: 1, y: 1, rgba: 'var(--c)' },
                { x: 2, y: 1, rgba: 'var(--c)' },
                { x: 3, y: 1, rgba: 'var(--c)' },
            ],
            [
                { x: 0, y: 2, rgba: 'var(--a)' },
                { x: 1, y: 2, rgba: 'var(--b)' },
                { x: 2, y: 2, rgba: 'var(--a)' },
                { x: 3, y: 2, rgba: 'var(--a)' },
            ],
        ]);
    });

    it("should construct CSS variables of given rows' RGBAs", () => {
        const { cssVariables, transformedRows } = transformCssVariables(rows);

        expect(cssVariables.replace(/\s/g, '')).toMatch(
            `--a: ${red};
            --b: ${blue};
            --c: ${black};
        `.replace(/\s/g, '')
        );
    });
});
