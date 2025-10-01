import Element from '$lib/Element';
import type { ViewProps } from './types';
import styles from './style.module.css';

class View extends Element<HTMLDivElement> {
    public constructor(props:ViewProps) {
        super({
            tagName: 'div',
            props: {
                className: styles.root,
                ...props,
            },
        });
    }
}

export default View;
