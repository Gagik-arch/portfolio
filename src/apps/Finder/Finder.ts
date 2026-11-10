import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';

function Finder(props?:AppProps) { 
    return (
        new App({
            name: 'Finder',
            appIcon: APP_IMAGES.Finder,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Finder app coming soon.' ],
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

export default Finder;
