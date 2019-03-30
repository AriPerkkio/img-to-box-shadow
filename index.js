const fs = require("fs");
const PNG = require("png-js");

const fileName = "resources/colors.png";
const width = 500;
const height = 500;
const ratio = 1;

const decToHex = dec => {
    const hex = dec.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
};

const getRows = data => {
    const rows = [];

    for (let i = 0; i < data.length; i += width * 4) {
        const row = data.slice(i, i + width * 4);
        const rgbas = [];

        for (let x = 0; x < row.length; x += 4) {
            const [r, g, b, a] = row.slice(x, x + 4);

            rgbas.push(
                `${(x / 4) * ratio}px ${rows.length * ratio}px 0 #${decToHex(r)}${decToHex(g)}${decToHex(b)}`
            );
        }

        rows.push(rgbas.join(", "));
    }

    return rows;
};


PNG.decode(fileName, pixels => {
    const rows = getRows(pixels);

    const output = `    #box-shadow-tester {
        height: ${ratio}px;
        width: ${ratio}px;
        box-shadow:
            ${rows.join(",\n")};
    }
`;

    fs.writeFile("main.css", output, "utf8", () => { });
});
