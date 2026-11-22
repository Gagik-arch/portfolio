import { Element } from '@nuvo-js/core';
import type { ButtonProps } from './types';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';

class Button extends Element<HTMLButtonElement> {
    public constructor({
        type = 'button',
        variant = 'default',
        className = '',
        onPress,
        events,
        ...props
    }: ButtonProps) {
        super('button', {
            className: clsx(
                'pointer',
                styles.root,
                className,
                styles[`root_${variant}`]
            ),
            type,
            events: {
                ...events,
                onclick: (e) => {
                    onPress?.(e);
                    events?.onclick?.(e);
                },
            },
            ...props,
        });
    }
}

export default Button;
