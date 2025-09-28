export type HTMLElementValues = HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
    | HTMLElementDeprecatedTagNameMap[keyof HTMLElementDeprecatedTagNameMap];

export type EventType = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

export type ElementPropsType<T extends HTMLElementValues> = Partial<Omit<T, 'children'>> & {
    children?: (string | HTMLElement)[];
    className?: string;
    events?: EventType;
};

export interface ElementConstructorType<T extends HTMLElementValues > {
    tagName: keyof HTMLElementTagNameMap;
    props: ElementPropsType<T>;
    rootElement?: HTMLElement;
}

