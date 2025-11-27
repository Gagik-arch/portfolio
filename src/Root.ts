import Desktop from '$components/Desktop';
import MenuBar from '$components/MenuBar';
import Dock from './components/Dock';

function App() {
    document.body.style.setProperty('--scale', (window.screen.availWidth / 1920).toFixed(1) );

    const onContextmenu = (e: MouseEvent) => { 
        e.preventDefault();
    };

    window.addEventListener('contextmenu', onContextmenu);
    
    window.addEventListener('unload', () => {
        window.removeEventListener('contextmenu', onContextmenu);
    });

    return (
        [
            MenuBar(),
            Desktop(),
            Dock()
        ]
    );
}

export default App;
