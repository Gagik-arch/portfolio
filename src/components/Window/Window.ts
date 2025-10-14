import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowProps } from './types';
import Controls from './Controls';

class Window extends Element<HTMLDivElement> {
    public constructor(props?:WindowProps) {
        super({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [],
                ...props,
            },
        });
    }
}
export default Window;
