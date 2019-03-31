const fs = require("fs");
const PngToBoxShadow = require("./index.js");

const fileName = "resources/colors.png";
const width = 500;
const ratio = 1;

PngToBoxShadow({ fileName, width, ratio }, (err, boxShadow) => {
    if (err) throw err;

    const output = `    #box-shadow-tester {
        height: ${ratio}px;
        width: ${ratio}px;
        box-shadow:
            ${boxShadow};
    }
`;

    fs.writeFile("main.css", output, "utf8", () => { });
});
