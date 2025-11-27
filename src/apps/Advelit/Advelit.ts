import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/advelit.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';

function Advelit(props?:AppProps) { 
    return (
        new App({
            name: 'Advelit',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Advelit' ],
                width: props?.width,
                height: props?.height,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
            }),
        })
    );
}

export default Advelit;
