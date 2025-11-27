import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function Plus(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 24 24',
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',

                ...props,
                children: [
                    new SVGElement({
                        tagName: 'path',
                        props: {
                            d: 'M5,12H19M12,5V19',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Plus;
