export type HTMLTags = keyof HTMLElementTagNameMap;

export type HTMLElementTags = HTMLElement & HTMLElementTagNameMap[HTMLTags];

export type Children = string | ChildNode | undefined | null | DocumentFragment | HTMLElement;

type Handlers = Omit<GlobalEventHandlers, 'addEventListener' | 'removeEventListener'>;

export type EventType<T extends HTMLElement> = {
    [K in keyof Handlers]?: Handlers[K] extends ((this: T, ev: infer E) => void) | null
        ? (ev: E) => void
        : never;
};

export type ElementPropsType<T extends HTMLElementTags>
    = Omit<Partial<T>, 'children' | 'className' | 'style'> & {
        children?: (Children)[] | undefined;
        className?: string | undefined;
        events?: EventType<T>;
        key?: string | number | undefined;
        style?: Partial<CSSStyleDeclaration> | undefined;
    };

export interface ElementConstructorType<T extends HTMLElementTags> {
    tagName: HTMLTags;
    props: ElementPropsType<T>;
    rootElement?: HTMLElement | null;
}

