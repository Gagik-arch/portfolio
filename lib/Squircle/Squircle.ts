import SVGElement from '../SVGElement';
import styles from './style.module.css';

function Squircle({
    radius = 20,
    width = 200,
    height = 200,
}:
{
    radius?: number;
    width?: number;
    height?: number;
}) {
    const svg = new SVGElement({
        tagName: 'svg',
        props: {
            className: styles.root,
            viewBox: '0 0 200 200',
            width,
            height,

        },
    });

    // const width = svg.dom.parentNode
    const tension = 0.55;
    let rC = radius; //  NOTE: Corner radius control point
    const lineHLength = width - rC * 2; //  NOTE: Horizontal line segment length
    const lineVLength = height - rC * 2; //  NOTE: Vertical line segment length

        //  NOTE: Ensure borderRadius doesn't exceed half of width or height
    if (rC > width / 2 || rC > height / 2) {
        rC = Math.min(width, height) / 3; //  NOTE: Adjust if too large
    }

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

    svg.setProps({
        children: [ path.dom ],
    });

    return svg.dom;
}

export default Squircle;
