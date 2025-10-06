import Button from '$uikit/Button';
import View from '$uikit/View';
import Icon from '$uikit/Icon';

function App() {
    let a = 0;
    const i = new Icon('MinLogo', {
        size: 30,

    });

    return (
        [
            new Button({
                children: [
                    'asd',
                    'asd'
                ],
                onclick: () => {
                    i.setProps({
                        className: (cx) => {
                            cx.add('new-class');
                        },
                        style: {
                            color: a % 2 == 0 ? 'red' : 'blue',
                        },
                    });
                    a++;
                },
            }).dom,
            new Button({
                children: [
                    'asd',
                    'asd'
                ],
            }).dom,

            new View({
                children: [ 'asdasdasdasdasasdggdfghdf' ],
            }).dom,

            i.dom
        ]
    );
}

export default App;
