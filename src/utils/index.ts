export const minNumberIndex = (arr:number[]):number => {
    return arr.reduce((r, v, i, a) => v > a[r] ? r : i, -1);
};

export const clampNumber = (num:number, min:number, max:number) => {
    return Math.max(min, Math.min(num, max));
};

export const getCssVariable = <T extends string | number>(key:string, element: HTMLElement = document.body ):T => {
    const style = window.getComputedStyle(element);
    const variable = style.getPropertyValue(key);

    return (isNaN(+variable) ? variable : +variable ) as T;
};
