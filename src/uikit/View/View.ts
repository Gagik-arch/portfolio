import Element from '$lib/Element';

class View extends Element {
    public constructor(
        props:object,
        tagName:keyof HTMLElementTagNameMap,
        rootElement:HTMLElement
    ) {
        super(tagName, props, rootElement);
    }
}

export default View;
