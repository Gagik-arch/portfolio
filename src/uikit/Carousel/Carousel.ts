import Element from '$lib/Element';
import type { CarouselProps } from './types';
import styles from './style.module.css';
import Image from '$uikit/Image';
import Button from '$uikit/Button';
import { getCssVariable } from '$utils/index';

function Carousel({
    images,
}: CarouselProps) { 
    let timeout: number | undefined;
    
    const line = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: styles.line,
            children: images.map(img => {
                return (
                    new Image({
                        className: styles.image,
                        src: img,
                    }).dom
                );
            }),
        },
    });

    const onLeft = () => {
        const old = getCssVariable<number>('--offset', line.dom);
        const a = ( ((old + images.length) - 1) % images.length).toString();

        line.dom.style.setProperty('--offset', a);
        clearTimeout(timeout);
    };

    const onRight = () => {
        const old = getCssVariable<number>('--offset', line.dom);
        const a = ((old + 1) % images.length).toString();

        line.dom.style.setProperty('--offset', a);
        clearTimeout(timeout);
    };

    line
        .onMount(() => {
            const loop = () => {
                if (timeout) { 
                    clearTimeout(timeout);
                }
                
                setTimeout(() => {
                    onRight();

                    loop();    
                }, 2000);    
            };

            loop();
        })
        .onUnMount(() => {
            clearTimeout(timeout);
        });
    
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ 
                    line.dom,

                    new Button({
                        className: styles.left,
                        children: [ 'left' ],
                        events: {
                            onclick: onLeft,
                        },
                    }).dom,

                    new Button({
                        className: styles.right,
                        children: [ 'right' ],
                        events: {
                            onclick: onRight,
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Carousel;
