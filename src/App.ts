import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import testStore from './store/test.store';

function App() {
    const a = new View({
        children: [
            'test',
            new Button({
                children: [ 'test button' ],
            }).dom
        ],
    });

    const i = new Input({
        id: 'input',
        className: 'late',
        events: {
            onkeyup: (e) => {
                const t = (e.target as HTMLInputElement);
                console.log(t.value);
            },
        },
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
                                a.replaceChild(
                                    1,
                                    prev % 2 === 0 ? i.dom : undefined
                                );
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
                            i.setProps({
                                value: state + '',
                            });
                        });
                    }).dom
            ],
        }).dom
    );
}

export default App;
