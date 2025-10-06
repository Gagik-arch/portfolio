import Button from '$uikit/Button';
import View from '$uikit/View';
import {
    Element, Fragment
} from '$lib/index';
import Icon from '$uikit/Icon';

function App() {

    const a = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            children: [ 'asdssssssssssssssss' ],
        },
    });

    return (
        Fragment([
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
        ])
    );
}

export default App;
