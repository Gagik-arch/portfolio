import Desktop from '$components/Desktop';
import MenuBar from '$components/MenuBar';
import Dock from './components/Dock';
import NotSupportedDevice from '$pages/NotSupportedDevice';
import { isStrictDesktop } from '$utils/index';
import Element from '$lib/Element';

function App() {
    document.body.style.setProperty('--scale', (window.screen.availWidth / 1920).toFixed(1));

    const onContextmenu = (e: MouseEvent) => {
        e.preventDefault();
    };

    window.addEventListener('contextmenu', onContextmenu);

    if (!isStrictDesktop()) {
        return [ NotSupportedDevice() ];
    }

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                id: 'container',
                children: [
                    MenuBar(),
                    Desktop(),
                    Dock()
                ],
            },
        }).dom
    );
}

export default App;
