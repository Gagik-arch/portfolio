export function camelToKebab(str: string) {
    return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
}

export function setupClassName(
    className?: ((classList: DOMTokenList) => void) | string | undefined,
    dom?: Element
) {
    if (!dom || !className) return;

    if (typeof className === 'function') {
        className(dom.classList);
    } else {
        if (dom.className !== className) { 
            dom.className = className;
        }
    }
}

export function setupStyle(
    style: HTMLElement['style'] | undefined,
    dom: HTMLElement
) {
    if (!style) return;

    Object.entries(style)
        .forEach(([
            property,
            value
        ]) => {
            if (!value) return;

            dom.style.setProperty(camelToKebab(property), value.toString());
        });
}
