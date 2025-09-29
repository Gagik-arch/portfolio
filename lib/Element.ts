import type {
    ElementPropsType, ElementConstructorType, HTMLElementValues, EventType
} from './types';

class Element <T extends HTMLElementValues = HTMLElement> {
    public dom: T;
    public events: EventType<T> = {};

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
            this.events = events;
        }

        this.dom = document.createElement(tagName) as T;

        if (children && Array.isArray(children)) {
            this.dom?.append(...children);
        } else {
            if (typeof children === 'string') {
                this.dom?.append(children);
            }
        }

        if (className) {
            this.dom.className = className;
        }

        if (rootElement) {
            rootElement.appendChild(this.dom);
        } else {
            document.getElementById('app')
                ?.appendChild(this.dom);
        }

        (Object.entries(props))
            .forEach(([ name, value ]) => {
                this.dom.setAttribute(name, value as string);
            });

        if (this.events) {
            Object.entries<EventType<T>[keyof EventType<T>]>(this.events)
                .forEach(([ type, listener ]) => {
                    this.dom?.addEventListener(type.replace('on', ''), listener as EventListener);
                });
        }
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

                if (this.events) {
                    Object.entries<EventType<T>[keyof EventType<T>]>(this.events)
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
