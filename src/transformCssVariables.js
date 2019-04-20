const increaseChar = char => String.fromCharCode(char.charCodeAt(0) + 1);
const increaseIndex = index => (index ? 1 + parseInt(index) : 0);
const parseCssVariable = cssVariable => cssVariable.match(/--(.*)/).pop();

const getNextVariableName = cssVariables => {
    const keys = Object.values(cssVariables);
    const lastKey = keys[keys.length - 1] || '--`';
    const lastName = parseCssVariable(lastKey);
    const char = lastName.charAt(0);
    const index = lastName.substr(1);

    if (char === 'z') {
        return 'a' + increaseIndex(index);
    }

    return increaseChar(char) + index || '';
};

const transform = rows => {
    // Identify duplicate RGBAs
    const rgbaCounts = {};
    rows.forEach(row =>
        row.forEach(
            cell => (rgbaCounts[cell.rgba] = (rgbaCounts[cell.rgba] || 0) + 1)
        )
    );

    // Construct CSS variables for RGBAs
    const rgbaToCssVar = {};
    Object.keys(rgbaCounts)
        .filter(rgba => rgbaCounts[rgba] > 1)
        .forEach(rgba => {
            rgbaToCssVar[rgba] = `--${getNextVariableName(rgbaToCssVar)}`;
        });

    // Construct rows with CSS variables and original RGBAs
    const transformedRows = rows.map(row =>
        row.map(cell => ({
            ...cell,
            rgba: rgbaToCssVar[cell.rgba]
                ? `var(${rgbaToCssVar[cell.rgba]})`
                : cell.rgba,
        }))
    );

    // Convert RGBA to CSS map to valid CSS variables
    const cssVariables = Object.keys(rgbaToCssVar)
        .map(rgba => `${rgbaToCssVar[rgba]}: ${rgba};`)
        .join('');

    return { cssVariables, transformedRows };
};

module.exports = transform;
