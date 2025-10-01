import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType
} from './types';
import { camelToKebab } from './utils';

type Children = (string | HTMLElement)[];

class Element <T extends HTMLElementTags = HTMLElement> {
    public dom: T;
    readonly #events: EventType<T> = {};

    public constructor({
        tagName,
        props: {
            key,
            children,
            className,
            style,
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
            style,
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
        style,
        ...props
    }: ElementPropsType<T>) {
        if (style) {
            Object.entries(style)
                .forEach(([ property, value ]) => {
                    if (!value) return;

                    this.dom.style.setProperty(camelToKebab(property), value.toString());
                });
        }

        if (className) {
            this.dom.className = className;
        }
        if (children) {
            const extractedChildren:Children = children?.filter(child => !!child) as Children;

            this.dom?.replaceChildren(...(extractedChildren || []));
        }

        Object.entries(props)
            .forEach(([ name, value ]) => {
                this.dom.setAttribute(name, value as string);
            });

        return this;
    }

    public replaceChild(newChild: null | undefined | Element | string, index: number) {
        if (!newChild) {
            if (index > -1) this.dom.removeChild(this.dom.childNodes[index]);
        } else {
            const target = this.dom.childNodes[index];

            if (newChild instanceof Element) {
                this.dom.replaceChild(target, newChild.dom);
            } else {
                target.replaceWith( newChild);
            }
        }
    }

    public onMount(callback: (e:this) => void) {
        const check = () => {
            if (document.body.contains(this.dom)) {
                callback(this);
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
