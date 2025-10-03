import Button from '$uikit/Button';
import View from '$uikit/View';
import testStore from './store/test.store';

function App() {
    const a = Array.from({ length: 5 }, (_, k) => {
        const z = new View({
            children: [
                k.toString(),

                new Button({
                    children: [ 'remove' ],
                    events: {
                        onclick: () => {
                            z.remove();
                        },
                    },
                }).dom
            ],
        });

        return (
            z.dom
        );
    });

    const v = new View({
        className: 'old View',
        children: [ 'pending' ],
    });

    return ([
        new Button({
            children: [ 'asd' ],
            events: {
                onclick: () => {

                    // testStore.setState(p => p + 1);
                    v.setProps({
                        children: a.map(i => i),
                    });
                },
            },
        }).dom,

        v.dom
    ] );
}

export default App;
