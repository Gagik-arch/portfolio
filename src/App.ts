import Button from '$uikit/Button';
import View from '$uikit/View';
import {
    Element, SVGElement, Fragment
} from '$lib/index';

function App() {

    const a = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            children: [ 'asdssssssssssssssss' ],
        },
    });

    return (
        Fragment([
            new Button({
                children: [
                    'asd',
                    'asd'
                ],
            }).dom,

            new View({
                children: [ 'asdasdasdasdasasdggdfghdf' ],
            }).dom,

            new SVGElement<SVGSVGElement >({
                tagName: 'svg',
                props: {
                    ariaHidden: 'true',
                    width: '100px',
                    height: '200px',
                    viewBox: '0 0 24 24',

                },
            }).dom
        ])
    );
}

export default App;
