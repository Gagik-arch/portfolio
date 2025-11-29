import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/music.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';

function Music(props?:AppProps) { 
    return (
        new App({
            name: 'Music',
            appIcon,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Music app coming soon.' ],
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

export default Music;
