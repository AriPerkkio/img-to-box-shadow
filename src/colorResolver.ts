const commonRgbs: { [key: string]: string } = {
    'rgb(0,0,0)': 'black',
    'rgb(255,255,255)': 'white',
    'rgb(255,0,0)': 'red',
    'rgb(0,255,0)': 'green',
    'rgb(0,0,255)': 'blue',
};

export const resolveColor = (pixel: number[]): string => {
    const [r, g, b, a] = pixel;
    let color;

    if (a === 0) {
        color = `rgb(0,0,0)`;
    } else if (a === 255) {
        color = `rgb(${r},${g},${b})`;
    } else {
        color = `rgba(${r},${g},${b},${a})`;
    }

    return commonRgbs[color] || color;
};
