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
import Tooltip from './Tooltip';
import desktopStore from '$store/desktop.store';
import allApps from '$apps/index';

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

    const onclick = (e:MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement; 
        target.classList.add(styles.on_open_animate);
        if (!target.id) return; 

        const app = desktopStore.getState().activeApps?.find(a => a.name === target.id);
        if (!app) return; 
        desktopStore.setFocusApp(app.window.id);

        app.window.dom.focus();
    };

    const onOpenAnimationEnd = (e: AnimationEvent, appName: keyof typeof allApps) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.id = appName;
        
        const app = allApps[appName]();

        desktopStore.updateApps(app);

    };

    const onDockAppMount = (e: Button) => {
        desktopStore.subscribe((state) => { 
            const app = state.activeApps?.find(a => a.name === e.dom.id);
            
            e.setProps({
                className: (cx) => {
                    if (app) {
                        cx.add(styles.is_opened);
                    } else { 
                        cx.remove(styles.is_opened);
                    }
                },
            });
        });
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
                        tabIndex: -1,
                        events: {
                            onclick: onclick,
                            onanimationend: (e) => {
                                onOpenAnimationEnd(e, 'Finder'); 
                            },
                        },
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            src: finder,
                                        }).dom,
                                        Tooltip('Finder' )
                                    ],
                                },
                            }).dom
                        ],
                    })
                        .onMount(onDockAppMount).dom, 
                    
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
                        tabIndex: -1,
                        className: styles.button,
                        events: {
                            onclick: onclick,
                            onanimationend: (e) => {
                                onOpenAnimationEnd(e, 'Calculator'); 
                            },
                        },
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
                    })
                        .onMount(onDockAppMount).dom,
                     
                    new Button({
                        className: styles.button,
                        events: {
                            onclick: onclick,
                            onanimationend: (e) => {
                                onOpenAnimationEnd(e, 'Notes'); 
                            },
                        },
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
                    })
                        .onMount(onDockAppMount).dom,

                    new Button({
                        className: styles.button,
                        events: {
                            onclick: onclick,
                            onanimationend: (e) => {
                                onOpenAnimationEnd(e, 'Settings'); 
                            },
                        },
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
                    })
                        .onMount(onDockAppMount).dom,

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
                    })
                        .onMount(onDockAppMount).dom,

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
                    })
                        .onMount(onDockAppMount).dom
                ],
            },
        }).dom
    );
}

export default Dock;
