import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType,
    Children,
    KeyedHTMLElement
} from './types';
import {
    setupClassName, setupStyle
} from '../utils';
import { setupChildren } from './utils';

class Element<T extends HTMLElementTags> {
    public dom: T;

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
            (this.dom as KeyedHTMLElement<T>).__key = key;
        }

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        this.dom.__props = {
            className,
            style,
        };
  
        this.setProps(
            {
                className,
                children,
                style,
                ...props,
            } as Omit<ElementPropsType<T>, 'className' | 'children'> & {
                className?: ((classList: DOMTokenList) => void) | string | undefined;
                children?: ((childNodes: Set<ChildNode>) => Set<ChildNode>) | Children[] | undefined;
            }
        ); 

        queueMicrotask(() => {
            const DOM = ([ ...(this.dom.parentElement?.children || []) ]).find(item => item.isEqualNode(this.dom));

            if (DOM) {
                this.dom = DOM as T;
            }

            if ( !events) return;

            Object.entries<EventType<T>[keyof EventType<T>]>(events)
                .forEach(([
                    type,
                    listener
                ]) => {
                    const event = type.replace('on', '');

                    this.dom.addEventListener(event, listener as EventListener);

                });

            (this.dom as KeyedHTMLElement<T>).__events = events;
        });
    }

    public setProps(
        {
            className,
            children,
            style,
            ...props
        }: Omit<ElementPropsType<T>, 'className' | 'children'> & {
            className?: ((classList: DOMTokenList) => void) | string | undefined;
            children?: ((childNodes: Set<ChildNode>) => Set<ChildNode>) | Children[] | undefined;
        },
        isForceUpdate = false
    ) {
        setupClassName(className, this.dom);
        setupStyle(style, this.dom);
        setupChildren(children, this.dom, isForceUpdate);
        
        Object.entries(props)
            .forEach(([
                name,
                value
            ]) => {
                if (typeof value === 'function') return;

                if (name in this.dom) {
                    (this.dom)[name as keyof T] = value;
                } else {
                    this.dom.setAttribute(name, value as string);
                }
            });

        return this;
    }

    public destroy() {
        if (!this.dom.__events) return;

        Object.entries(this.dom.__events)
            .forEach(([
                type,
                listener 
            ]) => {
                const event = type.replace('on', '');
                this.dom.removeEventListener(event, listener as EventListener);
            });

        this.remove();
    }

    public remove() {
        this.dom.remove();
    }

    public onMount(callback: (e: this) => void) {
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

    public onUnMount(callback: (e: this) => void) {
        const observer = new MutationObserver(() => {

            if (!this.dom.isConnected) {
                callback(this);

                const DOM = this.dom as KeyedHTMLElement<HTMLElement>;

                if ((DOM).__events) {
                    Object.entries(DOM.__events)
                        .forEach(([
                            type,
                            listener 
                        ]) => {
                            const event = type.replace('on', '');
                            this.dom.removeEventListener(event, listener as EventListener);
                        });
                }

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
