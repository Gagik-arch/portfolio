export interface ElementPropsType {
    children: (string | HTMLElement)[];
    className?: string;
    events?: Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;
}

export interface ElementConstructorType {
    tagName: keyof HTMLElementTagNameMap;
    props: ElementPropsType;
    rootElement?: HTMLElement;
}
