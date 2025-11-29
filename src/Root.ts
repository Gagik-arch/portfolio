import Desktop from '$components/Desktop';
import MenuBar from '$components/MenuBar';
import Dock from './components/Dock';
import NotSupportedDevice from '$pages/NotSupportedDevice';
import { isStrictDesktop } from '$utils/index';

function App() {
    document.body.style.setProperty('--scale', (window.screen.availWidth / 1920).toFixed(1) );

    const onContextmenu = (e: MouseEvent) => { 
        e.preventDefault();
    };

    window.addEventListener('contextmenu', onContextmenu);

    if (!isStrictDesktop() ) { 
        return [ NotSupportedDevice() ];
    }

    return (
        [
            MenuBar(),
            Desktop(),
            Dock()
        ]
    );
}

export default App;
