import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/settings/settings256.png';

function Settings() { 
    return (
        new App({
            name: 'Settings',
            appIcon,
            window: new Window({
                children: [ 'Settings' ],
            }),
        })
    );
}

export default Settings;
