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
                        tagName: 'div', props: {
                            children: [
                                new Button({
                                    children: [ new Icon('MinLogo').dom ],
                                }).dom,
                                new Typography('AppName', 'headline-regular').dom,
                                new Typography('item', 'body-emphasized').dom
                            ],
                        },
                    }).dom,
                    new Element<HTMLDivElement>({
                        tagName: 'div', props: {
                            children: [],
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default MenuBar;
