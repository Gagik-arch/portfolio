import SVGElement from '../SVGElement';
import styles from './style.module.css';
import type { SquircleProps } from './types';

function generateSquirclePath(
    width: number,
    height: number,
    power = 4,
    segments = 256
): string {
    if (width <= 0 || height <= 0) throw new Error('width/height must be > 0');
    if (segments < 8) segments = 8;

    const a = width / 2;
    const b = height / 2;
    const cx = a;
    const cy = b;

    const p = power;
    const exp = 2 / p;

    const points: [number, number][] = [];
    for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const xRel = a * Math.sign(cosT) * Math.pow(Math.abs(cosT), exp);
        const yRel = b * Math.sign(sinT) * Math.pow(Math.abs(sinT), exp);
        const x = cx + xRel;
        const y = cy + yRel;
        points.push([
            x,
            y
        ]);
    }

    let d = '';
    for (let i = 0; i < points.length; i++) {
        const [
            x,
            y
        ] = points[i];
        const cmd = i === 0 ? 'M' : 'L';

        d += `${cmd}${+x.toFixed(3)},${+y.toFixed(3)} `;
    }
    d += 'Z';
    return d;
}

function Squircle({
    className = '',
}:SquircleProps) {

    //  NOTE:  const tension = 0.8;

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

            e.dom.style.width = width + 'px';
            e.dom.style.height = height + 'px';

            const d = generateSquirclePath(height, height, 6);

            const path = new SVGElement<SVGPathElement>({
                tagName: 'path',
                props: {
                    d: d,
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
