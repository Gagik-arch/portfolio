export type HTMLElementValues = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export type EventType<T extends HTMLElement> = {
    [K in keyof GlobalEventHandlers]?: GlobalEventHandlers[K] extends ((this: T, ev: infer E) => void) | null
        ? (ev: E) => void
        : never;
};

export type ElementPropsType<T extends HTMLElementValues> = Partial<Omit<T, 'children'>> & {
    children?: (string | HTMLElement)[] | string;
    className?: string;
    events?: EventType<T>;
};

export interface ElementConstructorType<T extends HTMLElementValues > {
    tagName: keyof HTMLElementTagNameMap;
    props: ElementPropsType<T>;
    rootElement?: HTMLElement;
}

