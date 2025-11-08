import Element from '$lib/Element';
import Typography from '$uikit/Typography';
import Image from '$uikit/Image';
import styles from './style.module.css';
import Button from '$uikit/Button';
import type { DesktopIconProps } from './types';
 
function DesktopIcon({ 
    x,
    y,
    title,
    index,
    appIcon,
}: DesktopIconProps) { 
    const button = new Button({
        className: styles.app_icon,
        tabIndex: 0,
        'data-index': index,
        key: `${index}/${title}`,
        children: [
            new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    className: styles.image_container,
                    children: [
                        new Image({
                            src: appIcon,
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
                            text: title,
                            className: styles.title,
                            variant: 'body-emphasized',
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
