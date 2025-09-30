import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import testStore from './store/test.store';

function App() {

    const v = new View({
        key: '111',
        children: [
            testStore.getState()
                .toString()
        ],
    });

    const a = undefined;
    return (
        new View({
            children: [
                'test ',
                a,
                new Button({
                    children: [ 'asd' ],
                    events: {
                        onclick: () => {
                            testStore.setState(prev => {
                                v.setProps({
                                    children: [ (prev + 1).toString() ],
                                });
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
