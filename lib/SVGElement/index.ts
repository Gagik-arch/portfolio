import type {
    SVGElementPropsType, SVGElementConstructorType, SVGTags, EventType,
    Children
} from './types';
import { setupClassName } from '../utils';

const svgNS = 'http://www.w3.org/2000/svg';

class SVGElement <T extends SVGTags > {
    public dom: T;
    public key?: string | number | undefined = undefined;
    readonly #events: EventType<T> = {};

    public constructor({
        tagName,
        props: {
            children,
            className,
            style,
            events,
            ...props
        },
        rootElement,
    }: SVGElementConstructorType<T>) {
        this.dom = document.createElementNS(svgNS, tagName) as T;

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        this.setProps(
            {
                className,
                children,
                style,
                ...props,
            } as Omit<SVGElementPropsType<T>, 'className' | 'children'> & {
                className?: ((classList: DOMTokenList) => void) | string | undefined;
                children: ((childNodes:Set<ChildNode>)=>Set<ChildNode>) | Children[] | undefined;
            }
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
        }: Omit<SVGElementPropsType<T>, 'className' | 'children'> & {
            className?: ((classList: DOMTokenList) => void) | string | undefined;
            children: ((childNodes:Set<ChildNode>)=>Set<ChildNode>) | Children[] | undefined;
        }
    ) {
        setupClassName(className, this.dom);

        if (children) {
            const newChildren = typeof children === 'function' ? new Set(children(new Set(this.dom.childNodes))) : children;

            this.dom.replaceChildren(...newChildren);
        }

        Object.entries(props)
            .forEach(([
                name,
                value
            ]) => {
                this.dom.setAttribute(name, value as string);
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

export type { SVGElementPropsType };

export default SVGElement;
