import App from '$components/App';
import Window from '$components/Window';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import { APP_IMAGES } from '$utils/constants';

function Calendar(props?:AppProps) { 
    return (
        new App({
            name: 'Calendar',
            appIcon: APP_IMAGES.Calendar,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Calendar app coming soon.' ],
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

export default Calendar;
