import {
    SVGElement
} from '@nuvo-js/core';
import type { SVGElementPropsType } from '@nuvo-js/core/types';

function Plus(props: SVGElementPropsType) {
    return (
        new SVGElement('svg', {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            xmlns: 'http://www.w3.org/2000/svg',

            ...props,
            children: [
                new SVGElement<SVGPathElement>('path', {
                    d: 'M5,12H19M12,5V19',
                }).dom
            ],
        }).dom
    );
}

export default Plus;
