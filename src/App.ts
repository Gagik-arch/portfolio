import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import testStore from './store/test.store';

function App() {

    const v = new View({
        className: 'old View',
        children: [
            'asd',
            new Input({ id: 'asd' }).dom
        ],
    });
    const z = new View({
        children: [ 'new child' ],
    });
    return ([
        'asdasdasd',
        'asdasdasd',
        'asdasdasd',
        'asdasdasd',
        new Button({
            children: [ 'asd' ],
            events: {
                onclick: () => {
                    v.setProps({
                        children: (e) => {
                            if (e.has(z.dom)) {
                                e.delete(z.dom);
                                return e;
                            }
                            const a = new Set([
                                z.dom,
                                ...e
                            ]);
                            return a;
                        },
                    });
                },
            },
        }).dom,

        v.dom
    ] );
}

export default App;
