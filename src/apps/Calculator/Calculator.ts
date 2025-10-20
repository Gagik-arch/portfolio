import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator/calculator256.png';

function Calculator() { 
    return (
        new App({
            name: 'Calculator',
            appIcon,
            window: new Window({
                children: [],
            }),
        })
    );
}

export default Calculator;
