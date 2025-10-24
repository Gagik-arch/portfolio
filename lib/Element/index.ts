import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType,
    Children
} from './types';
import {
    setupClassName, setupStyle
} from '../utils';
import { setupChildren } from './utils';

class Element <T extends HTMLElementTags > {
    public dom: T;
    readonly #events: EventType<T> = {};

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
        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        if (events) {
            this.#events = events;
        }

        this.setProps(
            {
                className,
                children,
                style,
                key,
                ...props,
            } as Omit<ElementPropsType<T>, 'className' | 'children'> & {
                className?: ((classList: DOMTokenList) => void) | string | undefined;
                children?: ((childNodes:Set<ChildNode>)=>Set<ChildNode>) | Children[] | undefined;
            },
            true
        );

        if (this.#events) {
            Object.entries<EventType<T>[keyof EventType<T>]>(this.#events)
                .forEach(([
                    type,
                    listener
                ]) => {
                    this.dom?.addEventListener(type.replace('on', ''), listener as EventListener);
                });
        }
    }

    public setProps(
        {
            className,
            children,
            style,
            ...props
        }: Omit<ElementPropsType<T>, 'className' | 'children'> & {
            className?: ((classList: DOMTokenList) => void) | string | undefined;
            children?: ((childNodes:Set<ChildNode>)=>Set<ChildNode>) | Children[] | undefined;
        },
        isForceUpdate = false
    ) {

        setupStyle(style, this.dom);
        setupClassName(className, this.dom);

        setupChildren(children, this.dom, isForceUpdate);

        Object.entries(props)
            .forEach(([
                name,
                value
            ]) => {
                if (this.dom[name as keyof T] !== value) { 
                    this.dom.setAttribute(name, value as string);
                    this.dom[name as keyof T] = value;
                }
            });

        return this;
    }

    public replaceChild(index: number, newChild: null | undefined | HTMLElement | string) {
        const currentChild = this.dom.childNodes[index];

        if (currentChild === newChild) return;

        if (!newChild) {
            if (index > -1) this.dom.removeChild(currentChild);
        } else {
            if (!currentChild) {
                this.dom.append(newChild);
            } else {
                currentChild.replaceWith(newChild);
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

    public remove() {
        this.dom.remove();
    }

    public onUnMount(callback:(e:this)=>void) {
        const observer = new MutationObserver(() => {
            if (!document.body.contains(this.dom)) {
                callback(this);

                if (this.#events) {
                    Object.entries<EventType<T>[keyof EventType<T>]>(this.#events)
                        .forEach(([
                            type,
                            listener
                        ]) => {
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
