import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/notes/notes256.png';

function Notes() { 
    return (
        new App({
            name: 'Notes',
            appIcon,
            window: new Window({
                children: [ 'Notes' ],
            }),
        })
    );
}

export default Notes;
