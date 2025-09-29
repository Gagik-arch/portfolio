import Button from '$uikit/Button';
import View from '$uikit/View';
import Input from '$uikit/Input';
import Element from '$lib/Element';

function App() {

    return (
        View({
            children: [
                'test',
                new Element<HTMLButtonElement>({
                    tagName: 'button',
                    props: {
                        events: {
                            oninput: (e) => {
                                console.info(e);
                            },
                        },
                    },
                }).dom,
                Button({
                    children: [ 'click' ],
                    events: {
                        oninput: (e) => {
                            console.info(e);
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
