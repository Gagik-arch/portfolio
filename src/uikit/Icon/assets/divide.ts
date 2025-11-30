import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function Divide(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 24 24',
                stroke: 'currentColor',
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
                ...props,
                children: [
                    new SVGElement<SVGCircleElement>({
                        tagName: 'circle',
                        props: {
                            fill: 'currentColor',
                            cx: 12,
                            cy: 6,
                            r: 1,
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            stroke: 'currentColor',
                            x1: 3,
                            y1: 12,
                            x2: 21,
                            y2: 12,
                        },
                    }).dom,

                    new SVGElement<SVGCircleElement>({
                        tagName: 'circle',
                        props: {
                            fill: 'currentColor',
                            cx: 12,
                            cy: 18,
                            r: 1,
                        },
                    }).dom
                  
                ],
            },
        }).dom
    );
}

export default Divide;
