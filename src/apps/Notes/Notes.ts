import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/notes/notes256.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';

function Notes(props?:AppProps) { 
    return (
        new App({
            name: 'Notes',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Macos notes app coming soon.' ],
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

export default Notes;
