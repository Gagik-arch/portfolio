import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator/calculator256.png';
import type { AppProps } from '$apps/types';

function Calendar(props?:AppProps) { 
    return (
        new App({
            name: 'Calendar',
            appIcon,
            window: new Window({
                children: [ 'Calendar' ],
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

export default Calendar;
