interface Options {
    fileName: string;
    width: number;
    ratio: number;
    useCssVariables: boolean;
}

interface BoxShadow {
    x: number;
    y: number;
    rgba: string;
}

interface Result {
    boxShadow: string;
    cssVariables?: string;
}

interface TransformResult {
    cssVariables: string;
    transformedRows: BoxShadow[][];
}
