import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator/calculator256.png';
import styles from './style.module.css';

function Calculator() { 
    return (
        new App({
            name: 'Calculator',
            appIcon,
            window: new Window({
                children: [ 'Macos Calculator app coming soon.' ],
                className: styles.root,
                width: 300,
                height: 500,
                isResizable: false,
            }),
        })
    );
}

export default Calculator;
