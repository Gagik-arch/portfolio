import Element from '$lib/Element';
import Button from '$uikit/Button';
import styles from './styles.module.css';
import type { ControlProps } from './types';

function Controls({ 
    isResizable,
    onClose,
    onMinimize,
    onMaximize,
}:ControlProps) {

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.window_control_container,
                children: [
                    new Button({
                        className: styles.close,
                        events: {
                            onclick: onClose,
                        },
                    }).dom,
                    new Button({
                        className: styles.minimize,
                        events: {
                            onclick: onMinimize,
                        },
                    }).dom,
                    new Button({
                        className: styles.maximize,
                        children: [],
                        events: {
                            onclick: onMaximize,
                        },
                        disabled: !isResizable,
                    }).dom
                ],
            },
        }).dom
    );
}

export default Controls;
