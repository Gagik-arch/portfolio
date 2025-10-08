import Desktop from '$components/Desktop';
import MenuBar from '$components/MenuBar';
import Dock from './components/Dock';

function App() {

    return (
        [
            MenuBar(),
            Desktop(),
            Dock()
        ]
    );
}

export default App;
