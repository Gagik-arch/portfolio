import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/finder/finder256.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';

function Finder(props?:AppProps) { 
    return (
        new App({
            name: 'Finder',
            appIcon,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Finder app coming soon.' ],
                width: props?.width || 500,
                height: props?.height || 300,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
            }),
        })
    );
}

export default Finder;
