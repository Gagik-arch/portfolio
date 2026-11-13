import { Element } from '@nuvo-js/core';
import type { ButtonProps } from './types';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';

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
                className: clsx(
                    'pointer',
                    styles.root,
                    typeof className === 'function' ? undefined : className,
                    styles[`root_${variant}`]
                ),
                type,
                ...props,
            },
        });
    }
}

export default Button;
