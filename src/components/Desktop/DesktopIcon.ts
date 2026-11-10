import { Element } from '@nuvo-js/core';
import Typography from '$uikit/Typography';
import Image from '$uikit/Image';
import styles from './style.module.css';
import Button from '$uikit/Button';
import type { DesktopIconProps } from './types';
import { getAppIcon } from '$utils/index';
 
function DesktopIcon({ 
    x,
    y,
    title,
    index,
    onDoubleClick,
    onMouseDown,
}: DesktopIconProps) { 
    const button = new Button({
        className: styles.app_icon,
        tabIndex: 0,
        'data-index': index.toString(),
        key: `desktop-icon-${title}`,
        events: {
            ondblclick: onDoubleClick, 
            onmousedown: onMouseDown, 
        },
        children: [
            new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    className: styles.image_container,
                    children: [
                        new Image({
                            src: getAppIcon(title),
                        }).dom
                    ],
                },
            }).dom,
            new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    className: styles.title_wrapper,
                    children: [
                        new Typography({
                            text: title.replace('-', ' '),
                            className: styles.title,
                            variant: 'caption2-emphasized',
                        }).dom
                    ],
                },
            }).dom
        ],
    });

    button.dom.style.setProperty('--x', x + 'px');
    button.dom.style.setProperty('--y', y + 'px');

    return (
        button.dom
    );
}

export default DesktopIcon;
