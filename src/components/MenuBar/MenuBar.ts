import Element from '$lib/Element';
import Button from '$uikit/Button';
import Icon from '$uikit/Icon';
import Typography from '$uikit/Typography';
import styles from './style.module.css';
import desktopStore from '$store/desktop.store';

function MenuBar() {
    const date = new Date();
    let timeout: number | undefined;
    
    const format = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    
    const gbDateTime = format
        .format(date);
    
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.group_leading,
                            children: [
                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [ new Icon('MinLogo').dom ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [
                                        new Typography({
                                            text: 'Finder',
                                            variant: 'headline-regular',
                                        })
                                            .onMount((e) => {
                                                desktopStore.subscribe((state) => {
                                                    const app = state.activeApps.find(a => a.window.dom.id === state.focusedAppId);
                                                 
                                                    e.setProps({
                                                        children: [ app?.name || 'Finder' ],
                                                    });
                                                });
                                            }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [
                                        new Typography({
                                            text: 'Edit', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [
                                        new Typography({
                                            text: 'View', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [
                                        new Typography({
                                            text: 'Window', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [
                                        new Typography({
                                            text: 'Help', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom
                            ],
                        },
                    }).dom,

                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.group_trailing,
                            children: [
                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [ new Icon('Wifi', { size: 18 } ).dom ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [ new Icon('Search', { size: 18 } ).dom ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [ new Icon('UserCircle', { size: 18 } ).dom ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [ new Icon('ControlCenter', { size: 20 } ).dom ],
                                }).dom,

                                new Button({
                                    className: `not-allowed ${styles.item}`,
                                    children: [
                                        new Typography({
                                            text: gbDateTime,
                                            variant: 'body-emphasized',
                                        })
                                            .onMount((e) => {
                                                const check = () => {
                
                                                    timeout = setTimeout(() => {
                                                        e.setProps({
                                                            children: [
                                                                format
                                                                    .format(new Date())
                                                            ],
                                                        });
                                                        check();
                                                    }, 1000);
                                                };

                                                check();
                                            })
                                            .onUnMount(() => {
                                                clearTimeout(timeout);
                                            }).dom 
                                    ],
                                })
                                    .dom
                            ],
                        },
                    }).dom
                ],
            },
        })
            .dom
    );
}

export default MenuBar;
