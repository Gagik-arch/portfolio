import Element from '$lib/Element';
import type { ButtonProps } from './types';
import styles from './style.module.css';

class Button extends Element<HTMLButtonElement> {
    public constructor({
        type = 'button',
        ...props
    }:ButtonProps) {
        super({
            tagName: 'button',
            props: {
                type,
                className: styles.root,
                ...props,
            },
        });
    }
}

export default Button;
