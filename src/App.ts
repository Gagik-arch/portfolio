import Desktop from '$components/Desktop';
import MenuBar from '$components/MenuBar';
import Dock from './components/Dock';
import { updateCssScaleValue } from '$utils/index';

function App() {
    updateCssScaleValue();
    return (
        [
            MenuBar(),
            Desktop(),
            Dock()
        ]
    );
}

export default App;
