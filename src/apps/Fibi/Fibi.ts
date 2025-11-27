import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/fibi.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Carousel from '$uikit/Carusel';

function Fibi(props?:AppProps) { 
    return (
        new App({
            name: 'Fibi',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            children: [ Carousel() ],
                        },
                    }).dom,
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            children: [ 'right' ],
                        },
                    }).dom

                ],
                width: props?.width,
                height: props?.height,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
                minWidth: 800,
                minHeight: 500,
            }),
        })
    );
}

export default Fibi;
