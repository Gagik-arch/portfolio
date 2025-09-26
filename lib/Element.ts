class Element {
    public dom: HTMLElement | null = null;
    public props: object = {};

    public constructor(
        tagName : keyof HTMLElementTagNameMap,
        {
            children = [],
            ...props
        },
        rootElement?:HTMLElement
    ) {
        this.props = {
            children,
            ...props,
        };

        this.dom = document.createElement(tagName);
        this.dom.className = props?.className;
        this.dom?.append(...children);

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }
    }
}

export default Element;
