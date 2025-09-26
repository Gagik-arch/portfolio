import Button from '$uikit/Button';
import View from '$uikit/View';

function App() {

    return (
        new View(
            {
                children: [
                    'test', new Button(
                        {
                            className: 'test-class',
                            children: [ 'example button text' ],
                            onclick: () => {
                                console.info(1);
                            },
                        }
                    ).dom
                ],
            },
            'div',
            document.getElementById('app') as HTMLElement
        )
    );
}

export default App;
