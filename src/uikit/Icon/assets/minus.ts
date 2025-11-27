import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function Minus(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 14 14',
                stroke: 'currentColor',
                ...props,
                children: [
                    new SVGElement({
                        tagName: 'path',
                        props: {
                            d: 'M2 7H12', 
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Minus;
