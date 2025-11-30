import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function PlusSlashMinus(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 76 76',
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                baseProfile: 'full',
                enableBackground: 'new 0 0 76.00 76.00',
                ...props,
                children: [
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            d: 'M 38,46L 56,46L 56,50L 38,50L 38,46 Z M 21.0858,52.0858L 52.0858,21.0858L 54.9142,23.9142L 23.9142,54.9142L 21.0858,52.0858 Z M 19,26L 26,26L 26,19L 30,19L 30,26L 37,26L 37,30L 30,30L 30,37L 26,37L 26,30L 19,30L 19,26 Z', 
                            strokeLinejoin: 'round',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default PlusSlashMinus;
