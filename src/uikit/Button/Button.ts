import Element from '../../../lib/Element';

class Button extends Element {
    public constructor(
        props:object,
        rootElement?:HTMLElement
    ) {
        super('button', props, rootElement);
    }
}

export default Button;
