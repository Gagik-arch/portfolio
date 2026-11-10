import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';

function Settings(props?:AppProps) { 
    return (
        new App({
            name: 'Settings',
            appIcon: APP_IMAGES.Settings,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Settings app coming soon.' ],
                width: props?.width,
                height: props?.height,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
                minHeight: 600,
                minWidth: 700,
                isResizable: false,
            }),
        })
    );
}

export default Settings;
