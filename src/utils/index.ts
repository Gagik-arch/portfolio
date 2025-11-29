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

export const genRandomNumber = (min = 0, max = 10) => {
    if (min > max) throw new Error('max num must be greater than min');

    return min + Math.floor(Math.random() * (max - min) );
};

export const isObject = (val: unknown): val is Record<string, unknown> => val !== null && typeof val === 'object';

export const onCssVariableChange = (element:HTMLElement, callback:(e:string)=>void) => {
    const styleObserver = new MutationObserver((mutations) => {
        const currentValue = getCssVariable<string>('--offset', mutations[0].target as HTMLElement);
        
        callback(currentValue);
    });

    styleObserver.observe(element, {
        attributes: true,
        attributeFilter: [ 'style' ],
    });

    return () => styleObserver.disconnect();
};

export const isStrictDesktop = () => {
    const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent);

    return !isMobileUA && navigator.maxTouchPoints === 0;
};
