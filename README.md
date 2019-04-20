Convert images (.png) to box shadow

## Usage
```js
const fs = require('fs');
const PngToBoxShadow = require('./index.js');

const target = 'resources/main.css';
const fileName = 'resources/mnist.png';
const width = 594;
const ratio = 1;
const useCssVariables = true;

const cssTemplate = (boxShadow, cssVariables = '') =>
    `
:root {
    ${cssVariables}
}
#box-shadow-tester {
    height: ${ratio}px;
    width: ${ratio}px;
    box-shadow:
        ${boxShadow};
}
`;

PngToBoxShadow({ fileName, width, ratio, useCssVariables }, (err, result) => {
    if (err) throw err;

    const { boxShadow, cssVariables } = result;
    const output = cssTemplate(boxShadow, cssVariables);

    fs.writeFile(target, output, 'utf8', err =>
        err
            ? console.log(`Failed to write file, ${err.toString()}`)
            : console.log(`Completed, output size ${output.length}`)
    );
});
```
