import Element from '$lib/Element';
import type { ButtonProps } from './types';

function Button({
    type = 'button',
    ...props
}:ButtonProps) {

    return (
        new Element<HTMLButtonElement>({
            tagName: 'button',
            props: {
                type,
                ...props,
            },
        }).dom
    );
}

export default Button;
