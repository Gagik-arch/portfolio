import type {
    Children
} from './types';

export function setupChildren<T extends HTMLElement>(
    children: ((childNodes: Set<ChildNode>) => Set<ChildNode>) | Children[] | undefined,
    dom:T,
    isForceUpdate: boolean
) {
    if (children) {
        const newChildren = typeof children === 'function' ? new Set(children(new Set(dom.childNodes))) : children;

        const extractedChildren = ([ ...newChildren ])?.filter(child => !!child) as ChildNode[];

        const isEqual = extractedChildren.length && extractedChildren.every((item, index) => item === dom.childNodes[index]);
       
        if (isForceUpdate || !isEqual) {
            dom?.replaceChildren(...extractedChildren);
        } 
    }
}

