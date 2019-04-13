const increaseChar = char => String.fromCharCode(char.charCodeAt(0) + 1);
const increaseIndex = index => (index ? 1 + parseInt(index) : 0);
const parseCssVariable = cssVariable => cssVariable.match(/\((.*)\)/).pop();

const getNextVariableName = cssVariables => {
    const keys = Object.values(cssVariables);
    const lastKey = keys[keys.length - 1] || '(`)';
    const lastName = parseCssVariable(lastKey);
    const char = lastName.charAt(0);
    const index = lastName.substr(1);

    if (char === 'z') {
        return 'a' + increaseIndex(index);
    }

    return increaseChar(char) + index || '';
};

const compress = (cells, cssVariables) => ({
    cssVariables,
    compressedCells: cells.map(cell => {
        let cssVariable;

        if (cssVariables[cell.rgba]) {
            cssVariable = cssVariables[cell.rgba];
        } else {
            cssVariable = `--var(${getNextVariableName(cssVariables)})`;
            cssVariables[cell.rgba] = cssVariable;
        }

        return {
            ...cell,
            rgba: cssVariable,
        };
    }),
});

module.exports = compress;
