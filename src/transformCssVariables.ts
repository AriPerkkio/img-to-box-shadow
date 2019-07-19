const increaseChar = (char: string): string =>
    String.fromCharCode(char.charCodeAt(0) + 1);

const increaseIndex = (index: string): number =>
    index ? 1 + parseInt(index) : 0;

const getNextVariableName = (lastKey: any): string => {
    const lastName = (lastKey || '--`').substr(2);
    const char = lastName.charAt(0);
    const index = lastName.substr(1);

    if (char === 'z') {
        return 'a' + increaseIndex(index);
    }

    return increaseChar(char) + index || '';
};

const transform = (rows: any[any]): any => {
    // Identify duplicate RGBAs
    const rgbaCounts: any = {};
    rows.forEach((row: any): void =>
        row.forEach((cell: BoxShadow): void => {
            rgbaCounts[cell.rgba] = (rgbaCounts[cell.rgba] || 0) + 1;
        })
    );

    // Construct CSS variables for RGBAs
    const rgbaToCssVar: any = {};
    const generatedCssVars: any[any] = [];
    Object.keys(rgbaCounts)
        .filter(rgba => rgbaCounts[rgba] > 1)
        .forEach((rgba, i, all) => {
            const prevCssVar = generatedCssVars[generatedCssVars.length - 1];
            const cssVar = `--${getNextVariableName(prevCssVar)}`;
            rgbaToCssVar[rgba] = cssVar;
            generatedCssVars.push(cssVar);
        });

    // Construct rows with CSS variables and original RGBAs
    const transformedRows = rows.map((row: any) =>
        row.map((cell: any) => ({
            ...cell,
            rgba: rgbaToCssVar[cell.rgba]
                ? `var(${rgbaToCssVar[cell.rgba]})`
                : cell.rgba,
        }))
    );

    // Convert RGBA to CSS map to valid CSS variables
    const cssVariables = Object.keys(rgbaToCssVar)
        .map(rgba => `${rgbaToCssVar[rgba]}:${rgba};`)
        .join('');

    return { cssVariables, transformedRows };
};

export default transform;
