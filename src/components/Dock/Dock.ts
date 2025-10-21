import Element from '$lib/Element';
import styles from './style.module.css';
import finder from '$assets/images/app-icons/finder/finder256.png';
import trash from '$assets/images/app-icons/trash/trash256.png';
import folder from '$assets/images/app-icons/folder/folder256.png';
import settings from '$assets/images/app-icons/settings/settings256.png';
import launchpad from '$assets/images/app-icons/launchpad/launchpad256.png';
import calculator from '$assets/images/app-icons/calculator/calculator256.png';
import notes from '$assets/images/app-icons/notes/notes256.png';
import Button from '$uikit/Button';
import Image from '$uikit/Image';
import Calculator from '$apps/Calculator';
import Tooltip from './Tooltip';

function Dock() {
    const onMouseMove = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLDivElement;

        const button = (e.target as HTMLButtonElement).closest('.' + styles.button);
        if (!button) return;

        const buttonRect = button.getBoundingClientRect();
        const cursorDistance = e.clientX - buttonRect.x;
        const value = Math.abs(+(cursorDistance / 16).toFixed(0)) - 3;

        target.style.setProperty('--offset', `${value}px`);
    };

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                events: {
                    onmousemove: onMouseMove,
                },
                className: `${styles.root} dock`,
                children: [
                    new Button({
                        className: styles.button,
                        'data-tooltip': 'Numbers',
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: finder,
                                        }).dom,
                                        Tooltip( 'Finder' )
                                    ],
                                },
                            }).dom
                        ],
                    }).dom,
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: launchpad,
                                        }).dom,
                                        Tooltip('Launchpad')
                                    ],
                                },
                            }).dom
                        ],
                    }).dom,
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: calculator,
                                        }).dom,
                                        Tooltip('Calculator')
                                    ],
                                },
                            }).dom
                        ],
                    }).dom,
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: notes,
                                        }).dom,
                                        Tooltip( 'Notes' )
                                    ],
                                },
                            }).dom
                        ],
                    }).dom,

                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        Tooltip( 'Settings' ),
                                        new Image({
                                            src: settings,
                                        }).dom
                                    ],
                                },
                            }).dom
                        ],
                    }).dom,

                    new Element<HTMLHRElement>({
                        tagName: 'hr',
                        props: {
                            className: styles.separator,
                        },
                    }).dom,

                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: folder,
                          
                                        }).dom,
                                        Tooltip( 'Downloads' )
                                    ],
                                },
                            }).dom
                       
                        ],
                    }).dom,

                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: trash,
                                        }).dom,
                                        Tooltip( 'Trash' )
                                    ],
                                },
                            }).dom
                        ],
                    }).dom
                ],
            },
        }).dom
    );
}

export default Dock;
