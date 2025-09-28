import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';

function App() {

    return (
        View({
            children: [
                'test',

                Button({
                    children: [ 'click' ],
                    events: {
                        click: (e) => {
                            console.info(e, 1);
                        },
                    },
                }),

                Input({
                    placeholder: 'test',
                    id: 'email',
                    autocomplete: 'off',
                }),

                View({
                    children: [ 'string', 'asd' ],
                })
            ],
        })
    );
}

export default App;
