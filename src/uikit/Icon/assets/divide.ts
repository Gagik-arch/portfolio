import {
    SVGElement
} from '@nuvo-js/core';
import type { SVGElementPropsType } from '@nuvo-js/core/types';

function Divide(props: SVGElementPropsType) {
    return (
        new SVGElement('svg', {
            viewBox: '0 0 24 24',
            stroke: 'currentColor',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            ...props,
            children: [
                new SVGElement<SVGCircleElement>('circle', {
                    fill: 'currentColor',
                    cx: 12,
                    cy: 6,
                    r: 1,
                }).dom,

                new SVGElement<SVGLineElement>('line', {
                    stroke: 'currentColor',
                    x1: 3,
                    y1: 12,
                    x2: 21,
                    y2: 12,
                }).dom,

                new SVGElement<SVGCircleElement>('circle', {
                    fill: 'currentColor',
                    cx: 12,
                    cy: 18,
                    r: 1,
                }).dom
                  
            ],
        }).dom
    );
}

export default Divide;
