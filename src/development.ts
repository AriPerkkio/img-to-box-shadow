import fs from 'fs';
import PngToBoxShadow from './index.js';

const options: Options = {
    fileName: 'resources/colors.png',
    width: 500,
    ratio: 1,
    useCssVariables: true,
};
const target = 'resources/main.css';

const cssTemplate = (boxShadow: string, cssVariables: string = ''): string =>
    `
:root {
    ${cssVariables}
}
#box-shadow-tester {
    height: ${options.ratio}px;
    width: ${options.ratio}px;
    box-shadow:
        ${boxShadow};
}
`;

PngToBoxShadow(options, (err: Error, result: Result): void => {
    if (err) throw err;

    const { boxShadow, cssVariables } = result;
    const output = cssTemplate(boxShadow, cssVariables);

    fs.writeFile(target, output, 'utf8', (err: Error): void =>
        err
            ? console.log(`Failed to write file, ${err.toString()}`)
            : console.log(
                  `Completed, box shadow size ${boxShadow.length} `,
                  `css variables size ${(cssVariables || '').length}`
              )
    );
});
