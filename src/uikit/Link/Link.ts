import { Element } from '$lib/index';
import type { LinkProps } from './types';
import styles from './style.module.css';

class Link extends Element<HTMLAnchorElement> {
    public constructor({
        type = 'button',
        className = '',
        ...props
    }: LinkProps) {

        super({
            tagName: 'a',
            props: {
                className: `${styles.root} ${className}`,  
                type,
                ...props,
            },
        });
    }
}

export default Link;
