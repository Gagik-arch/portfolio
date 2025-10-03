import type {
    Children, ElementPropsType, HTMLElementTags
} from './types';

export function camelToKebab(str: string) {
    return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
}

export function setupClassName(
    className?: ((classList: DOMTokenList) => void) | string | undefined,
    dom?: HTMLElement
) {
    if (!dom || !className) return;

    if (typeof className === 'function') {
        className(dom.classList);
    } else {
        dom.className = className;
    }
}

export function setupStyle<T extends HTMLElementTags = HTMLElement>(
    style: ElementPropsType<T>['style'],
    dom: HTMLElement
) {
    if (!style || !dom) return;

    Object.entries(style)
        .forEach(([
            property,
            value
        ]) => {
            if (!value) return;

            dom.style.setProperty(camelToKebab(property), value.toString());
        });
}

export function setupChildren<T extends HTMLElementTags = HTMLElement>(
    children: ((childNodes: Set<ChildNode>) => Set<ChildNode>) | Children[] | undefined,
    dom:T,
    isForceUpdate: boolean
) {
    if (children) {
        const newChildren = typeof children === 'function' ? new Set(children(new Set(dom.childNodes))) : children;
        const extractedChildren = ([ ...newChildren ])?.filter(child => !!child ) as Node[];

        const isEqual = extractedChildren.length && extractedChildren.every((item, index) => item === dom.childNodes[index]);

        if (isForceUpdate || !isEqual) {
            dom?.replaceChildren(...extractedChildren);
        }
    }
}
