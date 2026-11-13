import { Element } from '@nuvo-js/core';
import type {
    ScrollProps
} from './types';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';

class Scroll extends Element<HTMLDivElement> {
    public constructor({
        className,
        children = [],
        ...props
    }: ScrollProps) {
        let timeout: number | undefined;
        
        super({
            tagName: 'div',
            props: {
                className: clsx(className, styles.root),
                children: [
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            id: styles.scroll,
                            events: {
                                onmouseleave: (e) => {
                                    const target = e.currentTarget as HTMLDivElement;
                
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
                            children,
                        },
                    }).dom
                ],
                ...props,
            },
        });
    }
}

export default Scroll;
