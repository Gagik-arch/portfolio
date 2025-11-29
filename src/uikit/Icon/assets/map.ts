import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function Map(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 24 24',
                stroke: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                fill: 'none',
                ...props,
                children: [
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            strokeWidth: 6,
                            d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
                        },
                    }).dom,
                    new SVGElement<SVGCircleElement>({
                        tagName: 'circle',
                        props: {
                            strokeWidth: 6,
                            cx: 12,
                            cy: 10,
                            r: 3,
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Map;
