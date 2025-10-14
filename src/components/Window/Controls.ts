import Element from '$lib/Element';
import Button from '$uikit/Button';
import styles from './styles.module.css';

function Controls() {

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.window_control_container,
                children: [
                    new Button({
                        id: styles.close,
                        children: [ ],
                    }).dom,
                    new Button({
                        id: styles.minimize,
                        children: [ ],
                    }).dom,
                    new Button({
                        id: styles.maximize,
                        children: [ ],
                    }).dom
                ],
            },
        }).dom
    );
}

export default Controls;
