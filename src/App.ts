import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import testStore from './store/test.store';

function App() {
    const a = new View({
        children: [ 'test' ],
    });

    return (
        new View({
            children: [
                'test ',
                new Button({
                    children: [ 'asd' ],

                    events: {
                        onclick: () => {
                            testStore.setState(prev => prev + 1);
                        },
                    },
                }).dom,

                new View({
                    key: '111',
                    children: [
                        testStore.getState()
                            .toString(), a.dom
                    ],
                })
                    .onMount(() => {
                        testStore.subscribe((state) => {
                            a.setProps({
                                children: [ 'test ' + state ],
                            });
                        });
                    }).dom
            ],
        }).dom
    );
}

export default App;
