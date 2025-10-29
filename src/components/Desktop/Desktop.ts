import Element from '$lib/Element';
import styles from './style.module.css';
import appsStore from '$store/apps.store';
import Vector from '$utils/trigonometry/Vector';

function Desktop() {
    let isMouseDowned = false;

    const windowContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: styles.window_container,
            children: [],
            events: {
                onmousedown: (e) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest('.window')) { 
                        isMouseDowned = true;
                    }
                },
                onmousemove: (e) => {
                    if (!isMouseDowned) return;
    
                    const target = e.target as HTMLElement;
                    const currentTarget = e.currentTarget as HTMLElement;
                    const rootRect = currentTarget.getBoundingClientRect();

                    const offset = new Vector(e.clientX - rootRect.x, e.clientY - rootRect.y)
                        .floor();
                    
                    const virtual = offset.subtract(new Vector(rootRect.width, 0))
                        .floor()
                        .divide(80)
                        .abs()
                        .floor();
                  
                },
            },
        },
    })
        .setProps({
            children: [
                new Element<HTMLDivElement>({
                    tagName: 'div',
                    props: {
                        className: styles.app_icon,
                        children: [],
                    },
                }).dom
                
            ],
        });

    const desktopElement = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'desktop',
            className: styles.root,
            children: [ windowContainer.dom ],
         
        },
    });

    const windowMouseDown = () => {
        isMouseDowned = false;
    };

    window.addEventListener('mouseup', windowMouseDown );

    appsStore.subscribe(({ apps }) => {
        windowContainer.setProps({
            children: apps.map(item => item.window.dom),
        });
    });

    return (
        desktopElement
            .onUnMount(() => {
                window.removeEventListener('mouseup', windowMouseDown );
            })
            .dom
    );
}

export default Desktop;
