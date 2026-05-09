import { mergeAttributes, setupInnerHtml } from '../utils';
import type {
    Children, KeyedHTMLElement
} from './types';

function keyedDiff(dom: HTMLElement, newChildren: KeyedHTMLElement<HTMLElement>[]) {
    const oldChildren = Array.from(dom.children) as KeyedHTMLElement<HTMLElement>[];

    const oldKeys = oldChildren.map((c) => c.__key);
    const newKeys = newChildren.map(c => c.__key);

    oldChildren.forEach(child => {
        if (!newKeys.includes(child.__key)) {
            child.remove();
        }
    });
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const oldChild = dom.children[i] as KeyedHTMLElement<HTMLElement>;

        if (!oldKeys.includes(newChild.__key)) {
            dom.insertBefore(newChild, oldChild);
        } else {
          
            if (oldChild.isEqualNode(newChild)) {
                setupInnerHtml(oldChild, newChild);
                mergeAttributes(oldChild, newChild);
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

        if (!oldNode && newNode) {
            dom.append(newNode);
        } else if (oldNode && !newNode) {
            dom.removeChild(oldNode);
        } else if (
            oldNode && newNode
            && oldNode.nodeType === Node.ELEMENT_NODE
            && !oldNode.isEqualNode(newNode)
        ) {
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
            const isAvailableKey = ([ ...dom.children ][0] as KeyedHTMLElement<HTMLElement>)?.__key;

            if (isAvailableKey) {
                keyedDiff(dom, extracted); //  NOTE: key in element
            } else { //  NOTE: not key in element
                unKeyedDiff(dom, extracted);
            }
        }
    }
}

export function compareElements(
    oldElement: KeyedHTMLElement<HTMLElement>,
    newElement: KeyedHTMLElement<HTMLElement>
):boolean {
    let oldSortedObject: object | null = null, 
            newSortedObject :object | null = null;
    
    if (oldElement.__props) { 
        oldSortedObject = Object.fromEntries(
            Object.entries(oldElement.__props)
                .sort()
        );
    }
        
    if (newElement.__props) { 
        newSortedObject = Object.fromEntries(
            Object.entries(newElement.__props)
                .sort()
        );
    }

    return JSON.stringify(oldSortedObject) === JSON.stringify(newSortedObject); 
}
