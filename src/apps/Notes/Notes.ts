import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/notes/notes256.png';
import styles from './style.module.css';

function Notes() { 
    return (
        new App({
            name: 'Notes',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 'Macos notes app coming soon.' ],
            }),
        })
    );
}

export default Notes;
