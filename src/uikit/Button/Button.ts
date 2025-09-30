import Element from '$lib/Element';
import type { ButtonProps } from './types';

class Button extends Element<HTMLButtonElement> {
    public constructor({
        type = 'button',
        ...props
    }:ButtonProps) {
        super({
            tagName: 'button',
            props: {
                type,
                ...props,
            },
        });
    }
}

export default Button;
