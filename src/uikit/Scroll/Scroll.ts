import Element from '$lib/Element';
import type {
    ScrollProps
} from './types';
import styles from './style.module.css';

class Scroll extends Element<HTMLDivElement> {
    public constructor({
        className,
        ...props
    }: ScrollProps) {
        let timeout: number | undefined;
        
        super({
            tagName: 'div',
            props: {
                className: `${className} ${styles.root}`,
                events: {

                    onmouseleave: (e) => {
                        const target = e.target as HTMLDivElement;
                
                        timeout = setTimeout(() => {
                            target.classList.remove(styles.visible);
                        }, 2000);
                    },
                    onmouseenter: (e) => { 
                        clearTimeout(timeout);

                        const target = e.currentTarget as HTMLDivElement;

                        target.classList.add(styles.visible);
                    },
                },
                ...props,
            },
        });
    }
}

export default Scroll;
