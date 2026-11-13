import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';

function Notes(props?:AppProps) { 
    return (
        new App({
            name: 'Notes',
            appIcon: APP_IMAGES.Notes,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Notes app coming soon.' ],
                width: props?.width,
                height: props?.height,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
                minWidth: 900,
                minHeight: 500,
            }),
        })
    );
}

export default Notes;
