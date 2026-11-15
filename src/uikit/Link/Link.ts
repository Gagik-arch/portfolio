import { Element } from '@nuvo-js/core';
import type { LinkProps } from './types';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';

class Link extends Element<HTMLAnchorElement> {
    public constructor({
        type = 'button',
        className = '',
        variant = 'default',
        ...props
    }: LinkProps) {

        super('a', {
            className: clsx(
                'pointer',
                styles.root,
                className,
                styles[`root_${variant}`]
            ),
            type,
            ...props,
        });
    }
}

export default Link;
