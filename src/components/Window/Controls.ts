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
                className: styles.traffic_light_container,
                children: [
                    new Button({
                        className: `${styles.traffic_light} ${styles.close}`,
                        children: [
                            new Icon( 'Plus', {
                                size: 16, 
                                stroke: 'rgba(0,0,0,0.4)',
                            }).dom 
                        ],
                        events: {
                            onclick: onClose,
                        },
                    }).dom,
                    new Button({
                        className: `${styles.traffic_light} ${styles.minimize}`,
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
                        className: `${styles.traffic_light} ${styles.maximize}`,
                        children: isResizable
                            ? [
                                new Icon('Maximize', {
                                    size: 13,
                                    fill: 'rgba(0,0,0,0.4)',
                                }).dom 
                            ]
                            : undefined,
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
