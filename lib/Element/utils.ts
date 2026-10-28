import { mergeAttributes, setupInnerHtml } from '../utils';
import type {
    Children, KeyedHTMLElement
} from './types';

export function compareProps(
    oldNode: HTMLElement | null,
    newNode: HTMLElement | null 
) { 
    if (!oldNode || !newNode) return false;
    
    const oldNAttrs = oldNode.attributes;
    const newNAttrs = newNode.attributes;
    
    if (oldNAttrs.length !== newNAttrs.length) return false;
    
    for (const attr of oldNAttrs) {
        if (newNode.getAttribute(attr.name) !== attr.value) {
            return true;
        }
    }

    return false;
}

function keyedDiff(dom: HTMLElement, newChildren: KeyedHTMLElement[]) {
    const oldChildren = Array.from(dom.children) as KeyedHTMLElement[];

    const oldKeys = oldChildren.map((c) => c.__key);
    const newKeys = newChildren.map(c => c.__key);

    oldChildren.forEach(child => {
        if (!newKeys.includes(child.__key)) {
            child.remove();
        }
    });

    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const oldChild = dom.children[i] as KeyedHTMLElement | null;

        if (!oldKeys.includes(newChild.__key)) {
            dom.insertBefore(newChild, oldChild);
        } else {
            const shouldReplace = compareProps(oldChild, newChild); 

            if (shouldReplace || (oldChild && oldChild.isEqualNode(newChild) )) {
                setupInnerHtml(oldChild as KeyedHTMLElement, newChild);
                mergeAttributes(oldChild as KeyedHTMLElement, newChild);
            } else {
                dom.insertBefore(newChild, oldChild);
            }
        }
    }
}

function unKeyedDiff(dom: HTMLElement, newChildren: HTMLElement[]) {
    const oldChildren = Array.from(dom.childNodes);

    const max = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < max; i++) {
        const oldNode = oldChildren[i] as HTMLElement | undefined;
        const newNode = newChildren[i] as HTMLElement | undefined;

        let shouldReplace;

        if (oldNode?.nodeType === Node.ELEMENT_NODE && newNode?.nodeType === Node.ELEMENT_NODE) {
            shouldReplace = compareProps(oldNode, newNode) || oldNode.innerHTML !== newNode.innerHTML;
        } else {
            shouldReplace = oldNode !== newNode;
        }

        if (!oldNode && newNode) {
            dom.append(newNode);
        } else if (oldNode && !newNode) {
            dom.removeChild(oldNode); 
        } else if (oldNode && newNode && shouldReplace) {
            oldNode.replaceWith(newNode);
        }
    }
}

export function setupChildren<T extends HTMLElement>(
    children: ((childNodes: Set<ChildNode>) => Set<ChildNode>) | Children[] | undefined,
    dom: T,
    isForceUpdate: boolean
) {
    if (children) {
        const newChildren
            = typeof children === 'function'
                ? Array.from(children(new Set(dom.childNodes)))
                : children;

        const extracted = newChildren.filter(Boolean) as HTMLElement[];

        if (isForceUpdate) {
            dom.replaceChildren(...extracted);
        } else {
            const isAvailableKey = ([ ...dom.children ][0] as KeyedHTMLElement)?.__key;

            if (isAvailableKey) {
                keyedDiff(dom, extracted); //  NOTE: key in element
            } else { //  NOTE: not key in element
                unKeyedDiff(dom, extracted);
            }
        }
    }
}

