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
                className: `pointer ${styles.root} ${className} ${styles[`root_${variant}`]}`,  
                type,
                ...props,
            },
        });
    }
}

export default Button;
