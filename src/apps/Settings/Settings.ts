import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/settings/settings256.png';
import styles from './style.module.css';

function Settings() { 
    return (
        new App({
            name: 'Settings',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Macos Settings app coming soon.' ],
            }),
        })
    );
}

export default Settings;
