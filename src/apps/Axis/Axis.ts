import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';

function Axis(props?:AppProps) { 
    return (
        new App({
            name: 'Axis',
            appIcon: APP_IMAGES.Axis,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [ 'Axis app coming soon.' ],
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

export default Axis;
