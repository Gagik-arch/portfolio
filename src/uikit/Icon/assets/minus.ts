import {
    SVGElement
} from '@nuvo-js/core';
import type { SVGElementPropsType } from '@nuvo-js/core/types';

function Minus(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 14 14',
                stroke: 'currentColor',
                ...props,
                children: [
                    new SVGElement<SVGPathElement>({
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
