import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/fibi.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';

function Fibi(props?:AppProps) { 
    return (
        new App({
            name: 'Fibi',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Fibi' ],
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

export default Fibi;
