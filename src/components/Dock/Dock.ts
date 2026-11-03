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
import { getCssVariable, setCSSVariable } from '$utils/index';

function Dock() {
    let mouseMoveTimeout : number | undefined = undefined;
    
    const onMouseEnter = (e: MouseEvent) => {
        const dock = e.currentTarget as HTMLDivElement;
        
        mouseMoveTimeout = setTimeout(() => {
            setCSSVariable('--transition', 'none', dock);
        }, 120);
    };

    const onMouseMove = (e: MouseEvent) => {
        const dock = e.currentTarget as HTMLDivElement;
        const buttons = [ ...dock.getElementsByClassName( styles.button) ] as HTMLElement[];

        const scaleFactorMatch = getCssVariable<number>('--scale');
        const globalScale = scaleFactorMatch ? scaleFactorMatch : 1;

        const maxDistance = 200 * globalScale; 

        buttons.forEach((btn) => {
            const rect = (btn).getBoundingClientRect();
            const center = rect.left + rect.width / 2;
            const distance = Math.abs(e.clientX - center);

            let scale = 1;
            if (distance < maxDistance) {
                const percent = distance / maxDistance;
                scale = 1 + 0.55 * Math.cos(percent * (Math.PI / 2));
            }

            setCSSVariable('--i-scale', scale.toFixed(3), btn);
        });
    };

    const onMouseLeave = (e: MouseEvent) => {
        const dock = e.currentTarget as HTMLDivElement;
        const buttons = [ ...dock.getElementsByClassName(styles.button) ] as HTMLDivElement[];
        
        clearTimeout(mouseMoveTimeout);
        
        setCSSVariable('--transition', 'all 90ms cubic-bezier(0.25, 1, 0.5, 1)', dock);

        buttons.forEach((btn) => {
            setCSSVariable('--i-scale', '1', btn);
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
            setCSSVariable('--transition', 'all 140ms cubic-bezier(0.25, 1, 0.5, 1)', e.dom);
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
                    .dom, 
                    
                new Button({
                    className: clsx(styles.button,
                        activeApps.findIndex(i => i.name === 'Launchpad') > -1 ? styles.is_opened : ''),
                    id: 'Launchpad',
                    key: 'Launchpad',
                    tabIndex: -1,
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
                        new Element<HTMLDivElement>({
                            tagName: 'div',
                            props: {
                                children: [
                                    new Image({
                                        src: calendar,
                                    }).dom,
                                    Tooltip( 'Calendar' )
                                ],
                            },
                        }).dom
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
                        new Element<HTMLDivElement>({
                            tagName: 'div',
                            props: {
                                children: [
                                    new Image({
                                        src: music,
                                    }).dom,
                                    Tooltip( 'Music' )
                                ],
                            },
                        }).dom
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
                    .dom,

                new Button({
                    className: styles.button,
                    key: 'Downloads',
                    tabIndex: -1,
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
                                    new Element<HTMLDivElement>({
                                        tagName: 'div',
                                        props: {
                                            children: [
                                                new Image({
                                                    src: icon.image,
                          
                                                }).dom,
                                                Tooltip(icon.title)
                                            ],
                                        },
                                    }).dom
                       
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
                           
                                }).dom
                        );
                    }),

                new Button({
                    className: styles.button,
                    key: 'Trash',
                    tabIndex: -1,
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
                    .dom
            ],
        });
    });
       
    return dock.dom;
}

export default Dock;
