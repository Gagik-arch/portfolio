import Element from '$lib/Element';
import Button from '$uikit/Button';
import Icon from '$uikit/Icon';
import { getCssVariable } from '$utils/index';
import styles from './styles.module.css';
import type { ControlProps } from './types';

function Controls({ 
    isResizable,
    onClose,
    onMinimize,
    onMaximize,
}:ControlProps) {
    const scale = getCssVariable<number>('--scale', document.body) || 1;

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
                                size: 12 * scale, 
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
                                size: 12 * scale,
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
                                    size: 11 * scale,
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
