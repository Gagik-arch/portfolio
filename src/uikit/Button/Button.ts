import Element, { type ElementPropsType } from '$lib/Element';

class Button extends Element {
    public constructor(
        props: ElementPropsType,
        rootElement?: HTMLElement
    ) {
        super({
            tagName: 'button',
            props,
            rootElement,
        });
    }
}

export default Button;
