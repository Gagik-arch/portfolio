import Element from '$lib/Element';
import Button from '$uikit/Button';
import Icon from '$uikit/Icon';
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
                        className: `${styles.icon} ${styles.close}`,
                        children: [
                            new Icon( 'Plus', {
                                size: 14, 
                                stroke: 'rgba(0,0,0,0.4)',
                            }).dom 
                        ],
                        events: {
                            onclick: onClose,
                        },
                    }).dom,
                    new Button({
                        className: `${styles.icon} ${styles.minimize}`,
                        children: [
                            new Icon( 'Minus', {
                                size: 14,
                                stroke: 'rgba(0,0,0,0.4)',
                            }).dom 
                        ],
                        events: {
                            onclick: onMinimize,
                        },
                    }).dom,
                    new Button({
                        className: `${styles.icon} ${styles.maximize}`,
                        children: [
                            new Icon('Maximize', {
                                size: 14,
                                fill: 'rgba(0,0,0,0.4)',
                            }).dom 
                        ],
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
