import { Element } from '$lib/index';
import type { ButtonProps } from './types';
import styles from './style.module.css';

class Button extends Element<HTMLButtonElement> {
    public constructor({
        type = 'button',
        variant = 'default',
        className = '',
        ...props
    }: ButtonProps) {

        super({
            tagName: 'button',
            props: {
                className: `${styles.root} ${styles[`root_${variant}`]} ${className}`,
                type,
                ...props,
            },
        });
    }
}

export default Button;
