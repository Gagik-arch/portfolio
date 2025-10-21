import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/finder/finder256.png';

function Finder() { 
    return (
        new App({
            name: 'Finder',
            appIcon,
            window: new Window({
                children: [ 'Finder' ],
            }),
        })
    );
}

export default Finder;
