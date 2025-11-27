import {
    SVGElement
} from '$lib/index';
import type { SVGElementPropsType } from '$lib/SVGElement';

function Maximize(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 38 38',
                stroke: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                ...props,
                children: [
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            stroke: 'currentColor',
                            d: 'M27.6054 8.61397C28.1599 8.6124 28.6098 9.06231 28.6082 9.61681L28.5754 21.164C28.5729 22.0536 27.4973 22.4973 26.8683 21.8683L15.3539 10.3539C14.7249 9.72494 15.1687 8.64936 16.0582 8.64683L27.6054 8.61397Z',
                        },
                    }).dom,
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            stroke: 'currentColor',
                            d: 'M9.61682 28.6083C9.06231 28.6099 8.6124 28.1599 8.61398 27.6054L8.64683 16.0582C8.64937 15.1687 9.72494 14.725 10.3539 15.354L21.8683 26.8683C22.4973 27.4973 22.0536 28.5729 21.164 28.5754L9.61682 28.6083Z',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Maximize;
