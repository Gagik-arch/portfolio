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
import dockIconsStore from '$store/dockIcons.store';

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
        const app = desktopStore.getState().activeApps.find(a => a.name === target.id);
       
        if (!app) return; 
        desktopStore.setFocusApp(app.window.dom.id);

        app.window.dom.focus();
    };
    
    const onOpenAnimationEnd = (e: AnimationEvent, appName: keyof typeof allApps) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.id = appName;
        const app = allApps[appName]();
      
        desktopStore.addApp(app);

        app.window.dom.focus();
    };

    const onDockAppMount = (e: Button) => {
        desktopStore.subscribe((state) => { 
            const app = state.activeApps.find(a => a.name === e.dom.id);
            
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

    const dock = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'dock',
            events: {
                onmousemove: onMouseMove,
            },
            className: `${styles.root} dock`,
            children: [
                new Button({
                    className: styles.button,
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
                                    new Image({ src: finder }).dom,
                                    Tooltip('Finder' )
                                ],
                            },
                        }).dom
                    ],
                })
                    .onMount(onDockAppMount).dom, 
                    
                new Button({
                    className: `not-allowed ${styles.button}`,
                    id: 'Launchpad',
                    key: 'Launchpad',
                    children: [
                        new Element<HTMLDivElement>({
                            tagName: 'div',
                            props: {
                                children: [
                                    new Image({ src: launchpad }).dom,
                                    Tooltip('Launchpad')
                                ],
                            },
                        }).dom
                    ],
                }).dom,

                new Button({
                    tabIndex: -1,
                    className: styles.button,
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
                                    new Image({ src: calculator }).dom,
                                    Tooltip('Calculator')
                                ],
                            },
                        }).dom
                    ],
                })
                    .onMount(onDockAppMount).dom,
                     
                new Button({
                    className: styles.button,
                    key: 'Notes',
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
                    key: 'Settings',
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
                        key: 'separator',
                        className: styles.separator,
                    },
                }).dom,

                new Button({
                    className: styles.button,
                    key: 'Downloads',
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
                    className: `not-allowed ${styles.button}`,
                    key: 'Trash',
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
    });
    
    dockIconsStore.subscribe((appIcons) => {

        dock.setProps({
            children: [
                new Button({
                    className: styles.button,
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
                    .onMount(onDockAppMount).dom, 
                    
                new Button({
                    className: styles.button,
                    id: 'Launchpad',
                    key: 'Launchpad',
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
                    .onMount(onDockAppMount).dom,
                     
                new Button({
                    className: styles.button,
                    key: 'Notes',
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
                    key: 'Settings',
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
                        key: 'separator',
                        className: styles.separator,
                    },
                }).dom,

                new Button({
                    className: styles.button,
                    key: 'Downloads',
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
                
                ...appIcons
                    .map(icon => {
                        return (
                            new Button({
                                className: styles.button,
                                key: icon.title,
                                id: icon.title,
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
                                .onMount((e) => {
                                    const target = e.dom;
                                    const appIsExists = desktopStore.getState().activeApps.find(item => item.name === target.id);
                                
                                    if (!appIsExists) {
                                        e.setProps({
                                            className: (cx) => {
                                                cx.add(styles.on_open_animate);
                                            },
                                        });
                                    } else { 
                                        e.setProps({
                                            className: (cx) => {
                                                cx.add(styles.is_opened);
                                            },
                                        });
                                    }
                                   
                                    onDockAppMount(e); 
                                }).dom
                        );
                    }),

                new Button({
                    className: styles.button,
                    key: 'Trash',
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
        });
    });
       
    return (
        dock.dom
    );
}

export default Dock;
