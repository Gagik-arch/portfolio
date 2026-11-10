
export const getCssVariable = <T extends string | number>(
    key: string,
    element: HTMLElement = document.body,
    defaultValue?:undefined | T
): T | undefined => {
    const style = window.getComputedStyle(element);
    const variable = style.getPropertyValue(key);

    if (isNaN(+variable)) return variable as T;
    
    if (variable === '') {
        if (defaultValue) return defaultValue;
        
        return undefined;
    }
    
    return +variable as T;
};

export const setCSSVariable = (key:string, value:string, element: HTMLElement = document.body ) => {
    element.style.setProperty(key, value);
};

export const onCssVariableChange = (
    element: HTMLElement,
    key: string,
    callback: (value: string | undefined) => void
) => {
    let previousValue: string | undefined;

    const update = () => {
        const value = getCssVariable<string>(key, element);

        if (value !== previousValue) {
            previousValue = value;
            callback(value);
        }
    };

    const observer = new MutationObserver(update);

    observer.observe(element, {
        attributes: true,
        attributeFilter: [ 'style' ],
    });

    update();

    return () => observer.disconnect();
};
