type Handlers = Omit<GlobalEventHandlers, 'addEventListener' | 'removeEventListener'>;

export type NodeChildren = string | ChildNode | undefined | null;
export type DOMElement = HTMLElement | SVGElement;

export type Dataset = Record<`data-${string}`, string>;
export type HTMLTags = keyof HTMLElementTagNameMap; 

export type HTMLElementTags = HTMLElementTagNameMap[HTMLTags]; 

export type Children = NodeChildren | DocumentFragment | HTMLElement;

export type EventType<T extends HTMLElement> = {
    [K in keyof Handlers]?: Handlers[K] extends ((this: T, ev: infer E) => void) | null
        ? (ev: E) => void
        : never;
};

export type ElementPropsType<T extends HTMLElementTags = HTMLElement>
    = Omit<Partial<T>, 'children' | 'className' | 'style'> & Dataset & {
        children?: Children[] | undefined;
        className?: string | undefined;
        events?: EventType<T>;
        style?: Partial<CSSStyleDeclaration> | undefined;
        key?: string;
    };

export interface ElementConstructorType<T extends HTMLElementTags> {
    tagName: HTMLTags;
    props: ElementPropsType<T>;
    rootElement?: HTMLElement | null;
}

export type VirtualHTMLElement = DOMElement & {
    __key?: string;
};
