import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/advelit.png';
import type { AppProps } from '$apps/types';

function Advelit(props?:AppProps) { 
    return (
        new App({
            name: 'Advelit',
            appIcon,
            window: new Window({
                children: [ 'Advelit' ],
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

export default Advelit;
