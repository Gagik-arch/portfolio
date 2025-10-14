import Element from '$lib/Element';
import styles from './style.module.css';
import Window from '$components/Window';

function Desktop() {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ new Window().dom ],
            },
        }).dom
    );
}

export default Desktop;
