import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';

function App() {

    return (
        View({
            children: [
                'test',
                'asdasd',

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
                })

            ],
        })
    );
}

export default App;
