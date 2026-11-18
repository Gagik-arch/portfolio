import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';
import Glass from '$uikit/Glass';
import { Element } from '@nuvo-js/core';

function Settings(props?:AppProps) { 
    return (
        new App({
            name: 'Settings',
            appIcon: APP_IMAGES.Settings,
            isNative: true,
            window: new Window({
                className: styles.root,
                children: [
                    new Glass({
                        children: [ ],
                    }).dom,

                    new Element<HTMLDivElement>('div').dom
                ],
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
