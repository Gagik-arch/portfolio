import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType,
    KeyedHTMLElement
} from './types';
import {
    isPlainObject,
    setupClassName, setupStyle
} from '../utils';
import { setupChildren } from './utils';

class Element<T extends HTMLElementTags> {
    public dom: T;
    private events?: EventType<T> | undefined;

    public constructor({
        tagName,
        props: {
            children,
            className,
            style,
            events,
            key,
            ...props
        },
        rootElement,
    }: ElementConstructorType<T>) {
        this.dom = document.createElement(tagName) as T;

        if (key) {
            (this.dom as KeyedHTMLElement).__key = key;
        }

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        this.SetProps(
            {
                className,
                children,
                style,
                ...props,
            } as Omit<ElementPropsType<T>, 'className'> & {
                className?: ((classList: DOMTokenList) => void) | string | undefined;
            }
        );

        this.SetEvents(events);
    }

    public SetProps(
        {
            className,
            children,
            style,
            ...props
        }: Omit<ElementPropsType<T>, 'className'> & {
            className?: ((classList: DOMTokenList) => void) | string | undefined;
        },
        isForceUpdate = false
    ) {
        if (className !== undefined) {
            setupClassName(
                className,
                this.dom
            );
        }

        if (style !== undefined) {
            setupStyle(
                style,
                this.dom
            );
        }

        if (children !== undefined) {
            setupChildren(
                children,
                this.dom,
                isForceUpdate
            );
        }

        Object.entries(props)
            .forEach(([ name, value ]) => {
                if ( name === 'events' || isPlainObject(value)) {
                    return;
                }

                if (name === 'value' && (this.dom instanceof HTMLInputElement || this.dom instanceof HTMLTextAreaElement)) {
                    if (this.dom.value === value) {
                        return;
                    } else {
                        this.dom.value = value;
                    }
                }

                if (name in this.dom) {
                    if (value === undefined || value === '') {
                        this.dom.removeAttribute(name);
                    } else {
                        if (((this.dom)[name as keyof T] !== undefined ) && (this.dom)[name as keyof T] !== value ) {
                            (this.dom)[name as keyof T] = value;
                        }
                    }
                } else {
                    if (value !== '' && this.dom.getAttribute(name) !== String(value)) {
                        this.dom.setAttribute(name, value as string);
                    }
                }
            });

        return this;
    }

    private SetEvents(
        events: EventType<T> | undefined
    ) {
        if (events) {
            Object.entries<EventType<T>[keyof EventType<T>]>(events)
                .forEach(([ type, listener ]) => {
                    this.dom.addEventListener(
                        type.replace(/^on/, ''),
                        listener as EventListener
                    );

                });

            this.events = events;
        }
    }

    public Destroy() {
        const events = this.events;

        if (!events) return;

        Object.entries(events)
            .forEach(([ type, listener ]) => {
                const event = type.replace('on', '');
                this.dom.removeEventListener(event, listener as EventListener);
            });

        this.Remove();
    }

    public Remove() {
        this.dom.remove();
    }

    public OnMount(callback: (e: this) => void) {
        if (this.dom.isConnected) {
            callback(this);
            return this;
        }
        const observer = new MutationObserver(() => {
            if (this.dom.isConnected) {
                callback(this);
                observer.disconnect();
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true,
        });

        return this;
    }

    public OnUnMount(callback: (e: this) => void) {
        const observer = new MutationObserver(() => {
            if (!this.dom.isConnected) {
                callback(this);

                this.Destroy();
                observer.disconnect();
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true,
        });

        return this;
    }
}

export type { ElementPropsType };

export default Element;
