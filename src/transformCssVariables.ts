const increaseChar = (char: string): string =>
    String.fromCharCode(char.charCodeAt(0) + 1);

const increaseIndex = (index: string): number =>
    index ? 1 + parseInt(index) : 0;

const getNextVariableName = (lastKey: string): string => {
    const lastName = (lastKey || '--`').substr(2);
    const char = lastName.charAt(0);
    const index = lastName.substr(1);

    if (char === 'z') {
        return 'a' + increaseIndex(index);
    }

    return increaseChar(char) + index || '';
};

const transform = (rows: BoxShadow[][]): TransformResult => {
    // Identify duplicate RGBAs
    const rgbaCounts: { [key: string]: number } = {};
    rows.forEach((row: BoxShadow[]): void =>
        row.forEach((cell: BoxShadow): void => {
            rgbaCounts[cell.rgba] = (rgbaCounts[cell.rgba] || 0) + 1;
        })
    );

    // Construct CSS variables for RGBAs
    const rgbaToCssVar: { [key: string]: string } = {};
    const generatedCssVars: string[] = [];
    Object.keys(rgbaCounts)
        .filter((rgba: string): boolean => rgbaCounts[rgba] > 1)
        .forEach((rgba: string): void => {
            const prevCssVar = generatedCssVars[generatedCssVars.length - 1];
            const cssVar = `--${getNextVariableName(prevCssVar)}`;
            rgbaToCssVar[rgba] = cssVar;
            generatedCssVars.push(cssVar);
        });

    // Construct rows with CSS variables and original RGBAs
    const transformedRows = rows.map((row: BoxShadow[]): BoxShadow[] =>
        row.map(
            (cell): BoxShadow => ({
                ...cell,
                rgba: rgbaToCssVar[cell.rgba]
                    ? `var(${rgbaToCssVar[cell.rgba]})`
                    : cell.rgba,
            })
        )
    );

    // Convert RGBA to CSS map to valid CSS variables
    const cssVariables = Object.keys(rgbaToCssVar)
        .map((rgba): string => `${rgbaToCssVar[rgba]}:${rgba};`)
        .join('');

    return { cssVariables, transformedRows };
};

export default transform;
