export const minNumberIndex = (arr:number[]):number => {
    return arr.reduce((r, v, i, a) => v > a[r] ? r : i, -1);
};

export const updateCssScaleValue = () => {
    const value = (window.screen.availWidth / 1920).toFixed(2);

    document.body.style.setProperty('--scale', value );
};
