import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType
} from './types';

type Children = (string | HTMLElement)[];

class Element <T extends HTMLElementTags = HTMLElement> {
    public dom: T;
    readonly #events: EventType<T> = {};
    #children: Children = [];
    readonly #key?: string | number;

    public constructor({
        tagName,
        props: {
            key,
            children,
            className,
            events,
            ...props
        },
        rootElement,
    }: ElementConstructorType<T>) {
        this.#key = key;

        if (events) {
            this.#events = events;
        }

        this.dom = document.createElement(tagName) as T;
        this.setProps( {
            className,
            children,
            ...props,
        } as ElementPropsType<T>);

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        if (this.#events) {
            Object.entries<EventType<T>[keyof EventType<T>]>(this.#events)
                .forEach(([ type, listener ]) => {
                    this.dom?.addEventListener(type.replace('on', ''), listener as EventListener);
                });
        }
    }

    public setProps({
        className,
        children,
        ...props
    }: ElementPropsType<T>) {
        const extractedChildren:Children = children?.filter(child => child !== undefined) as Children;

        this.#children = extractedChildren;

        console.info(this.#children, this.dom.childNodes[0] instanceof HTMLElement);

        if (className) {
            this.dom.className = className;
        }

        this.dom?.append(...(extractedChildren || []));

        Object.entries(props)
            .forEach(([ name, value ]) => {
                this.dom.setAttribute(name, value as string);
            });

        return this;
    }

    public onMount(callback: () => void) {
        const check = () => {
            if (document.body.contains(this.dom)) {
                callback();
            } else {
                requestAnimationFrame(check);
            }
        };
        check();

        return this;
    }

    public onUnMount(callback:()=>void) {
        const observer = new MutationObserver(() => {
            if (!document.body.contains(this.dom)) {
                callback();

                if (this.#events) {
                    Object.entries<EventType<T>[keyof EventType<T>]>(this.#events)
                        .forEach(([ type, listener ]) => {
                            this.dom.removeEventListener(type, listener as EventListener);
                        });

                    observer.disconnect();
                }
            }
        });

        observer.observe(document.body, {
            childList: true, subtree: true,
        });

        return this;
    }
}

export type { ElementPropsType };

export default Element;
