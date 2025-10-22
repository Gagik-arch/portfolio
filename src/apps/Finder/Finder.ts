import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/finder/finder256.png';
import styles from './style.module.css';

function Finder() { 
    return (
        new App({
            name: 'Finder',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Finder app coming soon.' ],
            }),
        })
    );
}

export default Finder;
