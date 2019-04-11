const fs = require('fs');
const PngToBoxShadow = require('./index.js');

const target = 'resources/main.css';
const fileName = 'resources/colors.png';
const width = 500;
const ratio = 1;
const compress = true;

PngToBoxShadow({ fileName, width, ratio, compress }, (err, boxShadow) => {
    if (err) throw err;

    const output = `    #box-shadow-tester {
        height: ${ratio}px;
        width: ${ratio}px;
        box-shadow:
            ${boxShadow};
    }
`;

    fs.writeFile(target, output, 'utf8', () => {});
});
