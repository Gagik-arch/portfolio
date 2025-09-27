import type { ElementPropsType, ElementConstructorType } from './types';

class Element {
    public dom: HTMLElement;
    public events: ElementPropsType['events'] = {};

    public constructor({
        tagName,
        props: {
            children,
            className,
            events,
            ...props
        },
        rootElement,
    }: ElementConstructorType) {
        if (events) {
            this.events = events;
        }

        this.dom = document.createElement(tagName);

        this.dom?.append(...children);

        if (className) {
            this.dom.className = className;
        }

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }
        if (this.events) {
            Object.entries(this.events)
                .forEach(([ type, listener ]) => {
                    this.dom?.addEventListener(type, listener );
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
                    Object.entries(this.events)
                        .forEach(([ type, listener ]) => {
                            this.dom.removeEventListener(type, listener);
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
