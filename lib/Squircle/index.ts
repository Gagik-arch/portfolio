import SVGElement from '../SVGElement';
import styles from './style.module.css';
import type { SquircleProps } from './types';

function Squircle({
    radius = 20,
    className = '',
}:SquircleProps) {
    const tension = 0.7;

    const svg = new SVGElement({
        tagName: 'svg',
        props: {
            className: `${className} ${styles.root}`,
            fill: 'currentColor',
        },
    })
        .onMount((e) => {
            const parentElement = e.dom.parentElement;
            if (!parentElement) return;

            const width = parentElement.clientWidth;
            const height = parentElement.clientHeight;

            let rC = Math.min(radius, 50); //  NOTE: Corner radius control point

            const lineHLength = width - rC * 2; //  NOTE: Horizontal line segment length
            const lineVLength = height - rC * 2; //  NOTE: Vertical line segment length

            //  NOTE: Ensure borderRadius doesn't exceed half of width or height
            if (rC > width / 2 || rC > height / 2) {
                rC = Math.min(width, height) / 3; //  NOTE: Adjust if too large
            }

            e.dom.style.width = width + 'px';
            e.dom.style.height = height + 'px';

            const d = `
            M ${rC} 0
            h ${lineHLength}
            c ${rC * tension} 0 ${rC} ${rC * (1 - tension)} ${rC} ${rC}
            v ${lineVLength}
            c 0 ${rC * tension} -${rC * (1 - tension)} ${rC} -${rC} ${rC}
            h -${lineHLength}
            c -${rC * tension} 0 -${rC} -${rC * (1 - tension)} -${rC} -${rC}
            v -${lineVLength}
            c 0 -${rC * tension} ${rC * (1 - tension)} -${rC} ${rC} -${rC}
            Z
        `;
            const path = new SVGElement<SVGPathElement>({
                tagName: 'path',
                props: {
                    d,
                },
            });

            e.setProps({
                children: [ path.dom ],
                viewBox: `0 0 ${width} ${height}`,
            });
        });

    return svg.dom;
}

export default Squircle;
