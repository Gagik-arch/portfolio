import Element from '$lib/Element';
import Button from '$uikit/Button';
import styles from './styles.module.css';
import type { ControlProps } from './types';

function Controls({ 
    isResizable,
}:ControlProps) {

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.window_control_container,
                children: [
                    new Button({
                        className: styles.close,
                        children: [ ],
                    }).dom,
                    new Button({
                        className: styles.minimize,
                        children: [ ],
                    }).dom,
                    new Button({
                        className: styles.maximize,
                        children: [],
                        disabled: !isResizable,
                    }).dom
                ],
            },
        }).dom
    );
}

export default Controls;
