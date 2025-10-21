import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator/calculator256.png';

function Calendar() { 
    return (
        new App({
            name: 'Calendar',
            appIcon,
            window: new Window({
                children: [ 'Calendar' ],
            }),
        })
    );
}

export default Calendar;
