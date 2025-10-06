import Button from '$uikit/Button';
import View from '$uikit/View';
import Icon from '$uikit/Icon';

function App() {

    return (
        [
            new Button({
                children: [
                    'asd',
                    'asd'
                ],
            }).dom,

            new View({
                children: [ 'asdasdasdasdasasdggdfghdf' ],
            }).dom,

            new Icon('MinLogo', {
                size: 30,
            }).dom
        ]
    );
}

export default App;
