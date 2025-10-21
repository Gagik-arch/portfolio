import Element from '$lib/Element';
import styles from './style.module.css';
import appsStore from '$store/apps.store';

function Desktop() {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                id: 'desktop',
                className: styles.root,
                children: [ 'asdasd' ],
            },
        })
            .onMount((e) => {
                appsStore.subscribe(({ apps }) => {
                    e.setProps({
                        children: apps.map(item => { 
                            return item.window.dom;
                        }),
                    });
                });
            })
            .dom
    );
}

export default Desktop;
