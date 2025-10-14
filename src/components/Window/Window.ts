import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowProps } from './types';
import Controls from './Controls';

class Window extends Element<HTMLDivElement> {
    public constructor(props?: WindowProps) {
        const width = props?.width || 500;
        const height = props?.height || 300;

        super({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ Controls() ],
                style: {
                    width: `calc(${width}px * var(--scale))`,
                    height: `calc(${height}px * var(--scale))`,
                    backgroundColor: props?.backgroundColor || '#fff',
                },
            },
        });
    }
}
export default Window;
