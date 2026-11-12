import { Element } from '@nuvo-js/core';
import type {
    TabsProps
} from './types';
import { clsx } from '$utils/clsx';
import styles from './styles.module.css';
import Button from '$uikit/Button';

class Tabs extends Element<HTMLDivElement> {
    public constructor({ 
        tabs,
        className,
    }:TabsProps) {
 
        super({
            tagName: 'div',
            props: {
                className: clsx(
                    className,
                    styles.root
                ),
                children: tabs.map(tab => {
                    return (
                        new Button({
                            variant: 'default',
                            className: clsx(styles.tab, 'sq'),
                            children: [ tab ],
                        }).dom
                    );
                }),
            },
        });
    }
}

export default Tabs;
