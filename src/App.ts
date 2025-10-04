import Button from '$uikit/Button';
import {
    Element, Text, Fragment
} from '$lib/index';
function App() {

    const a = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            children: [ 'asdssssssssssssssss' ],
        },
    });

    return (
        [
            new Button({
                children: [
                    'asd',
                    'asd'
                ],
            }).dom,
            a.dom
        ]
    );
}

export default App;
