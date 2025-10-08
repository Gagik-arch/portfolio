import Element from '$lib/Element';
import styles from './style.module.css';

function Desktop() {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ 'Desktop ' ],
            },
        }).dom
    );
}

export default Desktop;
