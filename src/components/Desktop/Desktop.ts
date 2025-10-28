import Element from '$lib/Element';
import styles from './style.module.css';
import appsStore from '$store/apps.store';
import allApps from '$apps/index';

function Desktop() {

    const desktopElement = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'desktop',
            className: styles.root,
            children: [ ],
        },
    });

    appsStore.subscribe(({ apps }) => {
        desktopElement.setProps({
            children: apps.map(item => item.window.dom),
        });
    });

    return (
        desktopElement
            .dom
    );
}

export default Desktop;
