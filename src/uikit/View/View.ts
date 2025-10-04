import { Element } from '$lib/index';
import type { ViewProps } from './types';
import styles from './style.module.css';

class View extends Element<HTMLDivElement> {
    public constructor(props:ViewProps) {
        super({
            tagName: 'div',
            props: {
                ...props,
            },
        });
    }
}

export default View;
