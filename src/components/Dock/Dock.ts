import Element from '$lib/Element';
import styles from './style.module.css';
import finder from '$assets/images/app-icons/finder.png';
import trash from '$assets/images/app-icons/trash.png';
import folder from '$assets/images/app-icons/folder.png';
import settings from '$assets/images/app-icons/settings.png';
import launchpad from '$assets/images/app-icons/launchpad.png';
import calculator from '$assets/images/app-icons/calculator.png';
import music from '$assets/images/app-icons/music.png';
import notes from '$assets/images/app-icons/notes.png';
import Button from '$uikit/Button';
import Image from '$uikit/Image';
import Tooltip from './Tooltip';
import desktopStore from '$store/desktop.store';
import allApps from '$apps/index';
import dockIconsStore from '$store/dockIcons.store';
import { clsx } from '$utils/clsx';
import {
    clamp, getCssVariable, setCSSVariable 
} from '$utils/index';
import type { DockIcon } from './types';

function Dock() {
    const globalScale = getCssVariable<number>('--scale') || 1;
    let animationFrame = 0,
            mouseX = 0,
            dockIcons: DockIcon[] = [],
            mouseMoveTimeout: number | undefined = undefined;
    
    const refreshDockIcons = (dock: HTMLDivElement) => {
        const dockRect = dock.getBoundingClientRect();

        dockIcons = [ ...dock.getElementsByClassName(styles.button) ].map((item) => {
            const element = item as HTMLElement;

            return {
                element,
                center: dockRect.left
                    + element.offsetLeft
                    + element.offsetWidth / 2,
                width: element.offsetWidth,
            };
        });
    };

    const onMouseEnter = (e: MouseEvent) => {
        const dock = e.currentTarget as HTMLDivElement;

        clearTimeout(mouseMoveTimeout);

        cancelAnimationFrame(animationFrame);
        animationFrame = 0;

        refreshDockIcons(dock);

        mouseMoveTimeout = setTimeout(() => {
            setCSSVariable('--transition', 'width 0ms ease-in-out, height 0ms ease-in-out', dock);
        }, 90);
    };

    const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        
        if (animationFrame) return;
        
        animationFrame = window.requestAnimationFrame(() => {
            
            const maxDistance = 200 * globalScale,
                    magnification = 0.5,
                    count = dockIcons.length;
            animationFrame = 0;

            for (let i = 0; i < count; i++) {
                const {
                    element, center,
                } = dockIcons[i];
             
                const distance = Math.abs(mouseX - center);

                const percent = distance / maxDistance;

                const scale = clamp(
                    1 + (magnification * Math.cos(percent * Math.PI / 2)),
                    1,
                    maxDistance
                );

                setCSSVariable( '--i-scale', scale.toFixed(2), element);
            }
        });
    };

    const onMouseLeave = (e: MouseEvent) => {
        const dock = e.currentTarget as HTMLDivElement;

        clearTimeout(mouseMoveTimeout);

        cancelAnimationFrame(animationFrame);
        animationFrame = 0;

        setCSSVariable(
            '--transition',
            'width 90ms ease-in-out, height 90ms ease-in-out',
            dock
        );

        dockIcons.forEach(({ element }) => {
            setCSSVariable('--i-scale', '1', element);
        });
    };

    const onclick = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement; 
        target.classList.add(styles.on_open_animate);

        if (!target.id) return; 
        const app = desktopStore.GetState().activeApps.find(a => a.name === target.id);
       
        if (!app) return; 

        desktopStore.setFocusApp(app.window.dom.id);
    };
    
    const onOpenAnimationEnd = (e: AnimationEvent, appName: keyof typeof allApps) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.id = appName;
        const app = allApps[appName]({
            key: appName, id: appName,
        });

        desktopStore.addApp(app);
        desktopStore.setFocusApp(app.window.dom.id);
    };

    const subscribers: (()=>void)[] = [];

    const dock = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'dock',
            events: {
                onmousemove: onMouseMove,
                onmouseleave: onMouseLeave,
                onmouseenter: onMouseEnter,
            },
            className: `${styles.root} dock`,
        },
    })
        .OnMount(e => {
            setCSSVariable(
                '--transition',
                'width 90ms ease-in-out, height 90ms ease-in-out',
                e.dom
            );
        })
        .OnUnMount(() => {
            subscribers.forEach(item => {
                item(); 
            });
        });
    
    desktopStore.Effect(async ({
        activeApps, focusedAppId,
    }) => {
        const dockIcons = [ ...dock.dom.children ];

        dockIcons.forEach(icon => {
            const app = activeApps.find(a => a.name === icon.id);

            if (app) {
                icon.classList.add(styles.is_opened);
            } else { 
                icon.classList.remove(styles.is_opened);
            }
        });

        activeApps.forEach(app => {
            if (app.window.dom.id === focusedAppId) { 
                app.window.dom.focus();
                
                return; 
            }
        });
    });

    dockIconsStore.Effect((appIcons) => {
        const calendar = localStorage.getItem('calendarIcon') as string;
        const activeApps = desktopStore.GetState().activeApps;
  
        dock.SetProps({
            children: [
                new Button({
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Finder') > -1 ? styles.is_opened : ''),
                    tabIndex: -1,
                    id: 'Finder',
                    key: 'Finder',
                    events: {
                        onclick: onclick,
                        onanimationend: (e) => {
                            onOpenAnimationEnd(e, 'Finder'); 
                        },
                    },
                    children: [
                        new Image({
                            src: finder,
                        }).dom,
                        Tooltip('Finder' )
                    ],
                })
                    .dom, 
                    
                new Button({
                    className: clsx(styles.button,
                        'not-allowed',
                        activeApps.findIndex(i => i.name === 'Launchpad') > -1 ? styles.is_opened : ''),
                    key: 'Launchpad',
                    tabIndex: -1,
                    children: [
                        new Image({
                            src: launchpad,
                        }).dom,
                        Tooltip('Launchpad')
                    ],
                }).dom,

                new Button({
                    tabIndex: -1,
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Calculator') > -1 ? styles.is_opened : ''),
                    id: 'Calculator',
                    key: 'Calculator',
                    events: {
                        onclick: onclick,
                        onanimationend: (e) => {
                            onOpenAnimationEnd(e, 'Calculator'); 
                        },
                    },
                    children: [
                        new Image({
                            src: calculator,
                        }).dom,
                        Tooltip('Calculator')
                    ],
                })
                    .dom,
                     
                new Button({
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Notes') > -1 ? styles.is_opened : ''),
                    key: 'Notes',
                    tabIndex: -1,
                    id: 'Notes',
                    events: {
                        onclick: onclick,
                        onanimationend: (e) => {
                            onOpenAnimationEnd(e, 'Notes'); 
                        },
                    },
                    children: [
                        new Image({
                            src: notes,
                        }).dom,
                        Tooltip( 'Notes' )
                    ],
                })
                    .dom,
                     
                new Button({
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Calendar') > -1 ? styles.is_opened : ''),
                    key: 'Calendar',
                    tabIndex: -1,
                    id: 'Calendar',
                    events: {
                        onclick: onclick,
                        onanimationend: (e) => {
                            onOpenAnimationEnd(e, 'Calendar'); 
                        },
                    },
                    children: [
                        new Image({
                            src: calendar,
                        }).dom,
                        Tooltip( 'Calendar' )
                    ],
                })
                    .dom,
                
                new Button({
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Music') > -1 ? styles.is_opened : ''),
                    key: 'Music',
                    id: 'Music',
                    tabIndex: -1,
                    events: {
                        onclick: onclick,
                        onanimationend: (e) => {
                            onOpenAnimationEnd(e, 'Music'); 
                        },
                    },
                    children: [
                        new Image({
                            src: music,
                        }).dom,
                        Tooltip( 'Music' )
                    ],
                })
                    .dom,

                new Button({
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Settings') > -1 ? styles.is_opened : ''),
                    key: 'Settings',
                    id: 'Settings',
                    tabIndex: -1,
                    events: {
                        onclick: onclick,
                        onanimationend: (e) => {
                            onOpenAnimationEnd(e, 'Settings'); 
                        },
                    },
                    children: [
                        new Image({
                            src: settings,
                        }).dom,
                        Tooltip( 'Settings' )
                    ],
                })
                    .dom,

                new Button({
                    className: `${styles.button} not-allowed`,
                    key: 'Downloads',
                    tabIndex: -1,
                    children: [
                        new Image({
                            src: folder,
                          
                        }).dom,
                        Tooltip( 'Downloads' )
                    ],
                })
                    .dom,
                
                ...appIcons
                    .map(icon => {
                        return (
                            new Button({
                                className: clsx(styles.button,
                                    activeApps.findIndex(i => i.name === icon.title) > -1 ? `${styles.on_open_animate} ${styles.is_opened}` : ''),
                                key: icon.title,
                                id: icon.title,
                                tabIndex: -1,
                                events: {
                                    onclick: onclick,
                                    onanimationend: (e) => {
                                        onOpenAnimationEnd(e, icon.title); 
                                    },
                                },
                                children: [
                                    new Image({
                                        src: icon.image,
                          
                                    }).dom,
                                    Tooltip(icon.title)
                                ],
                            })
                                .OnMount((e) => {
                                    const target = e.dom;
                                    const appIsExists = desktopStore.GetState().activeApps.find(item => item.name === target.id);

                                    if (!appIsExists) {
                                        e.SetProps({
                                            className: (cx) => {
                                                cx.add(styles.on_open_animate);
                                            },
                                        });
                                    } else { 
                                        e.SetProps({
                                            className: (cx) => {
                                                cx.add(styles.is_opened);
                                            },
                                        });
                                    }
                           
                                })
                                .dom
                        );
                    }),

                new Button({
                    className: `${styles.button} not-allowed`,
                    tabIndex: -1,
                    key: 'Trash',
                    children: [
                        new Image({
                            src: trash,
                        }).dom,
                        Tooltip( 'Trash' )
                    ],
                })
                    .dom
            ],
        });
    });
       
    return dock.dom;
}

export default Dock;
