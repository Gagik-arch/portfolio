import Element, { type ElementPropsType } from '$lib/Element';

class View extends Element {
    public constructor(
        props:ElementPropsType,
        tagName:keyof HTMLElementTagNameMap,
        rootElement?:HTMLElement
    ) {
        super({
            tagName,
            props,
            rootElement,
        });
    }
}

export default View;
