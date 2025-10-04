import Button from '$uikit/Button';
import View from '$uikit/View';
import testStore from './store/test.store';
import Fragment from '$lib/Fragment';
import Text from '$lib/Text';
import Element from '$lib/Element';

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
