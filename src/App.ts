import Desktop from '$components/Desktop';
import MenuBar from '$components/MenuBar';
import Dock from './components/Dock';
import { updateCssVariable } from '$utils/index';

function App() {
    updateCssVariable('--scale', (window.screen.availWidth / 1920).toFixed(1));

    return (
        [
            MenuBar(),
            Desktop(),
            Dock()
        ]
    );
}

export default App;
