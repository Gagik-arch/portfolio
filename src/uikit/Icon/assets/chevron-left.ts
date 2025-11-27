import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function ChevronLeft(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 16 16',
                stroke: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                ...props,
                children: [
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            fillRule: 'evenodd',
                            d: 'M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default ChevronLeft;
