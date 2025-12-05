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

        const extractedChildren = ([ ...newChildren ]).filter(child => !!child) as ChildNode[];
    
        if (isForceUpdate) {
            dom.replaceChildren(...extractedChildren);
        } else { 
            for (let i = 0; i < Math.max(extractedChildren.length, dom.children.length); i++) {
                const newChild = extractedChildren[i] as (HTMLElement | null );
                const oldChild = dom.childNodes[i] as (HTMLElement | null);
         
                if (!oldChild && newChild) {                    
                    dom.append(newChild);
                } 

                if (newChild && oldChild) {
                    if (oldChild.nodeType === 1 && newChild.nodeType === 1) {
                       
                        if (oldChild.getAttribute('key') && newChild.getAttribute('key')) {
                            if (oldChild.getAttribute('key') !== newChild.getAttribute('key')) {
                                oldChild.replaceWith(newChild);
                            }
                        } else {
                            if (!oldChild.isEqualNode(newChild)) {
                                oldChild.replaceWith(newChild);
                            }
                        }

                    } else {
                        if (oldChild !== newChild) {
                            oldChild.replaceWith(newChild);
                        }
                    }
                } 

                if (oldChild && !newChild) { 
                    dom.removeChild(oldChild);
                }
            }
        }
    }
}

