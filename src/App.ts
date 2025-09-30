import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import testStore from './store/test.store';

function App() {

    const v = new View({
        children: [ 'asd' ],
    });

    return (
        new View({
            children: [
                'test ',
                new Button({
                    children: [ 'asd' ],
                    events: {
                        onclick: () => {
                            testStore.setState(prev => {
                                console.log(prev + 1);
                                return prev + 1;
                            });

                        },
                    },
                }).dom,

                v.dom
            ],
        }).dom
    );
}

export default App;
