import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function ChevronLeft(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 24 24',
                stroke: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                ...props,
                children: [
                    new SVGElement<SVGPolygonElement>({
                        tagName: 'polyline',
                        props: {
                            points: '15 18 9 12 15 6',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default ChevronLeft;
