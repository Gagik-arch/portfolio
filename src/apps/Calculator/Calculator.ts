import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';

function Calculator(props?:AppProps) { 
    return (
        new App({
            name: 'Calculator',
            appIcon,
            isNative: true,
            window: new Window({
                children: [ 'Macos Calculator app coming soon.' ],
                className: styles.root,
                backgroundColor: 'rgba(0,0,0,0.9)',
                isResizable: false,
                minWidth: 300,
                minHeight: 500,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
                
            }),
        })
    );
}

export default Calculator;
