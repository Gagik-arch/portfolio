import Element from '$lib/Element';
import Button from '$uikit/Button';
import Icon from '$uikit/Icon';
import Typography from '$uikit/Typography';
import styles from './style.module.css';
import appsStore from '$store/apps.store';

function MenuBar() {
    
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
                                    className: styles.icon,
                                    children: [ new Icon('MinLogo').dom ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [
                                        new Typography({
                                            text: 'Finder',
                                            variant: 'headline-regular',
                                        })
                                            .onMount((e) => {
                                                appsStore.subscribe((state) => {
                                                    const app = state.apps.find(a => a.window.id === state.focusedAppId);
                                                 
                                                    e.setProps({
                                                        children: [ app?.name || 'Finder' ],
                                                    });
                                                });
                                            }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [
                                        new Typography({
                                            text: 'Edit', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [
                                        new Typography({
                                            text: 'View', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [
                                        new Typography({
                                            text: 'Window', variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: styles.item,
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
                                    className: styles.item,
                                    children: [ new Icon('Wifi', { size: 18 } ).dom ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [ new Icon('Search', { size: 18 } ).dom ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [ new Icon('UserCircle', { size: 18 } ).dom ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [ new Icon('ControlCenter', { size: 20 } ).dom ],
                                }).dom,

                                new Button({
                                    className: styles.item,
                                    children: [
                                        new Typography({
                                            text: 'Mon Jun 10  9:41 AM',
                                            variant: 'body-emphasized',
                                        }).dom 
                                    ],
                                }).dom

                            ],
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default MenuBar;
