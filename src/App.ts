import Button from '$uikit/Button';
import View from '$uikit/View';

function App() {

    return (
        new View(
            {
                children: [
                    'test',
                    'asdasd',
                    new Button({
                        children: [ 'click' ],
                        events: {
                            click: (e) => {
                                console.info(e, 1);
                            },
                        },
                    }).dom
                ],
            },
            'div',
            document.getElementById('app') as HTMLElement
        )
    );
}

export default App;
