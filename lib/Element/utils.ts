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
       
        if (isForceUpdate) {
            dom?.replaceChildren(...extractedChildren);
        } else { 
      
            for (let i = 0; i < Math.max(extractedChildren.length, dom.children.length); i++) {
                const newChild = extractedChildren[i];
                const oldChild = dom.childNodes[i];
                if (oldChild) {
                    if (newChild !== oldChild) {
                        oldChild.replaceWith(newChild);
                    }
                } else { 
                    dom.append(newChild);
                }
            }
        }
    }
}

