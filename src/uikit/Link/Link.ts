import { Element } from '@nuvo-js/core';
import type { LinkProps } from './types';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';

class Link extends Element<HTMLAnchorElement> {
    public constructor({
        type = 'button',
        className = '',
        ...props
    }: LinkProps) {

        super({
            tagName: 'a',
            props: {
                className: clsx(styles.root, className),
                type,
                ...props,
            },
        });
    }
}

export default Link;
