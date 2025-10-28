import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/settings/settings256.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';

function Settings(props?:AppProps) { 
    return (
        new App({
            name: 'Settings',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Settings app coming soon.' ],
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

export default Settings;
