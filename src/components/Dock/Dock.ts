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

function Dock() {
    const calendar = localStorage.getItem('calendarIcon') as string;
    
    const onMouseMove = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLDivElement;

        const button = (e.target as HTMLButtonElement).closest('.' + styles.button);
        if (!button) return;

        const buttonRect = button.getBoundingClientRect();
        const cursorDistance = e.clientX - buttonRect.x;

        const step = Math.trunc(cursorDistance / 15) + 1;

        const value = Math.abs(step) - 4;

        target.style.setProperty('--offset', `${value}px`);
    };
    
    const onClick = (e:MouseEvent) => {
        const target = e.target as HTMLDivElement; 
        const element:HTMLElement | null = target.closest(`.${styles.button}`);

        if (!element?.id) return; 
        
        const app = desktopStore.getState().activeApps.find(a => a.name === element.id);

        if (app) {
            desktopStore.setFocusApp(app.window.dom.id);
            app.window.dom.focus();
        } else { 
            element.classList.add(styles.on_open_animate);
            const appName = element.id as keyof typeof allApps;
        
            const app = allApps[appName]({ key: `window/${appName}` });

            desktopStore.addApp(app);
        }
    };
     
    const onOpenAnimationEnd = (e: AnimationEvent) => {
        const target = e.target as HTMLDivElement; 
        const element:HTMLElement | null = target.closest(`.${styles.button}`);
        
        if (!element?.id) return;

        const appName = element.id as keyof typeof allApps;
        
        const app = allApps[appName]();

        app.window.dom.focus();
   
    };
    
    const dock = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'dock',
            events: {
                onmousemove: onMouseMove,
                onanimationend: onOpenAnimationEnd,
                onmousedown: onClick,
            },
            className: `${styles.root} dock`,
        },
    });

    desktopStore.effect((state) => {
        dock.setProps({
            children: [
                new Button({
                    className: `${styles.button} ${state.activeApps.find(a => a.name === 'Finder') ? styles.is_opened : ''}`,
                    id: 'Finder',
                    key: 'Finder',
                    tabIndex: -1,
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
                }).dom,
                    
                new Button({
                    className: styles.button,
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
                    className: `${styles.button} ${state.activeApps.find(a => a.name === 'Calculator') ? styles.is_opened : ''}`,
                    id: 'Calculator',
                    key: 'Calculator',
                    tabIndex: -1,
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
                    .dom,
                     
                new Button({
                    className: `${styles.button} ${state.activeApps.find(a => a.name === 'Notes') ? styles.is_opened : ''}`,
                    id: 'Notes',
                    key: 'Notes',
                    tabIndex: -1,
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
                    className: `${styles.button} ${state.activeApps.find(a => a.name === 'Calendar') ? styles.is_opened : ''}`,
                    key: 'Calendar',
                    id: 'Calendar',
                    tabIndex: -1,
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
                    className: `${styles.button} ${state.activeApps.find(a => a.name === 'Music') ? styles.is_opened : ''}`,
                    key: 'Music',
                    id: 'Music',
                    tabIndex: -1,
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
                    className: `${styles.button} ${state.activeApps.find(a => a.name === 'Settings') ? styles.is_opened : ''}`,
                    key: 'Settings',
                    id: 'Settings',
                    tabIndex: -1,
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
                    .dom

                // new Element<HTMLHRElement>({
                //     tagName: 'hr',
                //     props: {
                //         key: 'separator',
                //         className: styles.separator,
                //     },
                // }).dom,

                // new Button({
                //     className: styles.button,
                //     key: 'Downloads',
                //     tabIndex: -1,
                //     children: [
                //         new Element<HTMLDivElement>({
                //             tagName: 'div',
                //             props: {
                //                 children: [
                //                     new Image({
                //                         src: folder,
                          
                //                     }).dom,
                //                     Tooltip( 'Downloads' )
                //                 ],
                //             },
                //         }).dom
                       
                //     ],
                // })
                //     .dom,
                
                // // ...dockIconsStore.getState()
                // //     .map(icon => {
                // //         const app = state.activeApps.findIndex(a => a.name === icon.title) > -1;

                // //         return (
                // //             new Button({
                // //                 className: `${styles.button} ${app ? styles.is_opened : ''}`,
                // //                 key: icon.title,
                // //                 id: icon.title,
                // //                 tabIndex: -1,
                // //                 children: [
                // //                     new Element<HTMLDivElement>({
                // //                         tagName: 'div',
                // //                         props: {
                // //                             children: [
                // //                                 new Image({ src: icon.image }).dom,
                // //                                 Tooltip(icon.title)
                // //                             ],
                // //                         },
                // //                     }).dom
                // //                 ],
                // //             })
                // //                 .dom
                // //         );
                // //     }),

                // new Button({
                //     className: styles.button,
                //     key: 'Trash',
                //     tabIndex: -1,
                //     children: [
                //         new Element<HTMLDivElement>({
                //             tagName: 'div',
                //             props: {
                //                 children: [
                //                     new Image({
                //                         src: trash,
                //                     }).dom,
                //                     Tooltip( 'Trash' )
                //                 ],
                //             },
                //         }).dom
                //     ],
                // })
                //     .dom
            ],
        });
    });
       
    return (
        dock.dom
    );
}

export default Dock;
