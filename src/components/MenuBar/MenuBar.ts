import Element from '$lib/Element';
import Button from '$uikit/Button';
import Icon from '$uikit/Icon';
import Typography from '$uikit/Typography';
import styles from './style.module.css';

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
                                    children: [ new Typography('AppName', 'headline-regular').dom ],
                                }).dom,

                                ...Array.from({ length: 5 }, (_, k) => new Button({
                                    className: styles.item,
                                    children: [ new Typography('item' + (k + 1), 'body-emphasized').dom ],
                                }).dom)
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
                                    children: [ new Typography('Mon Jun 10  9:41 AM', 'body-emphasized').dom ],
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
