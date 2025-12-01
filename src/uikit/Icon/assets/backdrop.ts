import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function Backdrop(props: SVGElementPropsType) {
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
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            stroke: 'currentColor',
                            d: 'M7.99902 3.75H21C21.6904 3.75 22.25 4.30964 22.25 5V19C22.25 19.6904 21.6904 20.25 21 20.25H7.99902C7.61407 20.2499 7.2505 20.0721 7.01367 19.7686L1.55176 12.7686C1.19915 12.3166 1.19915 11.6834 1.55176 11.2314L7.01367 4.23145C7.2505 3.92795 7.61407 3.75007 7.99902 3.75Z', 
                            strokeWidth: '1.5',
                            strokeLinecap: 'round',
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            stroke: 'currentColor',
                            x1: 0.75,
                            y1: -0.75,
                            x2: 13.4049,
                            y2: -0.75,
                            strokeLinecap: 'round', 
                            transform: 'matrix(0.686635 0.727003 -0.686622 0.727015 8.70911 7.85153)',
                            strokeWidth: '1.5',
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            stroke: 'currentColor',
                            x1: 0.75,
                            y1: -0.75,
                            x2: 13.405,
                            y2: -0.75,
                            strokeLinecap: 'round', 
                            strokeWidth: '1.5',
                            transform: 'matrix(0.686629 -0.727008 0.686629 0.727008 9.28076 18.1421)',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Backdrop;
