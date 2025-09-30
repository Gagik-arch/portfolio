import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType
} from './types';

class Element <T extends HTMLElementTags = HTMLElement> {
    public dom: T;
    readonly #events: EventType<T> = {};
    readonly #children: ElementPropsType<T>['children'] = [];

    public constructor({
        tagName,
        props: {
            children,
            className,
            events,
            ...props
        },
        rootElement,
    }: ElementConstructorType<T>) {

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
    }:ElementPropsType<T> ) {
        if (className) {
            this.dom.className = className;
        }

        this.dom?.append(...(children || []));

        (Object.entries(props))
            .forEach(([ name, value ]) => {
                this.dom.setAttribute(name, value as string);
            });

        return this;
    }

    public onMount(callback:()=>void) {
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
