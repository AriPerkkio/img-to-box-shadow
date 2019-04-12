const fs = require('fs');
const PngToBoxShadow = require('./index.js');

const target = 'resources/main.css';
const fileName = 'resources/colors.png';
const width = 500;
const ratio = 1;

const cssTemplate = boxShadow =>
    `    #box-shadow-tester {
    height: ${ratio}px;
    width: ${ratio}px;
    box-shadow:
        ${boxShadow};
}
`;

PngToBoxShadow({ fileName, width, ratio }, (err, boxShadow) => {
    if (err) throw err;

    const output = cssTemplate(boxShadow);

    fs.writeFile(target, output, 'utf8', err =>
        err
            ? console.log(`Failed to write file, ${err.toString()}`)
            : console.log(`Completed, box shadow size ${boxShadow.length}`)
    );
});
