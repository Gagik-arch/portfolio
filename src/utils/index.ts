export const minNumberIndex = (arr:number[]):number => {
    return arr.reduce((r, v, i, a) => v > a[r] ? r : i, -1);
};

export const updateCssVariable = (key:string, value:string) => {

    document.body.style.setProperty(key, value );
};

export const getCssVariable = <T extends string | number>(element: HTMLElement = document.body):T => {
    const style = window.getComputedStyle(element);
    const variable = style.getPropertyValue('--scale');

    return (isNaN(+variable) ? variable : +variable ) as T;
};

export const clampNumber = (num:number, min:number, max:number) => {
    return Math.max(min, Math.min(num, max));
};
