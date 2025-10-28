import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator/calculator256.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';

function Calculator(props?:AppProps) { 
    return (
        new App({
            name: 'Calculator',
            appIcon,
            window: new Window({
                children: [ 'Macos Calculator app coming soon.' ],
                className: styles.root,
                isResizable: false,
                width: props?.width || 300,
                height: props?.height || 500,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
            }),
        })
    );
}

export default Calculator;
