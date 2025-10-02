import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import testStore from './store/test.store';

function App() {
    const a = new View({
        className: 'r',
        children: [
            'test',
            new Button({
                children: [ 'test button' ],
            }).dom
        ],
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
                                return prev + 1;
                            });
                        },
                    },
                }).dom,

                new View({
                    key: '111',
                    children: [
                        testStore.getState()
                            .toString(),
                        a.dom
                    ],
                })
                    .onMount(() => {
                        testStore.subscribe((state) => {
                            a.setProps({
                                className: (cx) => {

                                    if (state % 2 === 0) {
                                        cx.delete('r');
                                        cx.add('b');
                                    } else {
                                        cx.delete('b');
                                        cx.add('r');
                                    }
                                    return cx;
                                },
                            });
                        });
                    }).dom
            ],
        }).dom
    );
}

export default App;
