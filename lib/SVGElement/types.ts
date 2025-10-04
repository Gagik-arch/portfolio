export type HTMLSVGTags = keyof SVGElementTagNameMap;

export type SVGTags = SVGElementTagNameMap[HTMLSVGTags];

export type Children = ChildNode;

type Handlers = Omit<GlobalEventHandlers, 'addEventListener' | 'removeEventListener'>;

export type EventType<T extends SVGElement> = {
    [K in keyof Handlers]?: Handlers[K] extends ((this: T, ev: infer E) => void) | null
        ? (ev: E) => void
        : never;
};

export type SVGElementPropsType<T extends SVGTags>
    = Omit<Partial<Record<keyof T, string>>, 'children' | 'className' | 'style'> & {
        children?: (Children)[] | undefined;
        className?: string | undefined;
        style?: Partial<CSSStyleDeclaration> | undefined;
        events?: EventType<T>;
    };

export interface SVGElementConstructorType<T extends SVGTags > {
    tagName: HTMLSVGTags;
    props: SVGElementPropsType<T>;
    rootElement?: HTMLElement | SVGAElement | null;
}

