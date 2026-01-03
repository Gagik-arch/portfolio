import Element from '$lib/Element';
import type { CarouselProps } from './types';
import styles from './style.module.css';
import Image from '$uikit/Image';
import Button from '$uikit/Button';
import { getCssVariable, onCssVariableChange } from '$utils/index';
import Icon from '$uikit/Icon';

function Carousel({
    images,
    timeout = 5000,
}: CarouselProps) { 
    let timer: number | undefined;
    
    const line = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: styles.line,
            style: {
                gridTemplateColumns: `repeat(${images.length}, 100%)`,
            },
            children: images.map(img => {
                return (
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.image_wrapper,
                          
                            children: [
                                new Image({
                                    className: styles.image,
                                    src: img,
                                }).dom
                            ],
                        },
                    }).dom
                );
            }),
        },
    });

    const dots = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: styles.dots,
            children: images.map((_, index) => {
                return (
                    new Button({
                        className: getCssVariable<number>('--offset', line.dom) === index ? styles.active : undefined,
                        events: {
                            onclick: () => {
                                line.dom.style.setProperty('--offset', index.toString());
                            },
                        },
                    }).dom
                );
            }),
        },
    }); 
  
    const mutation = onCssVariableChange(line.dom, '--offset', () => {
        const dotButtons = dots.dom.querySelectorAll('button');

        dotButtons.forEach((button, index) => {
            const savedIndex = getCssVariable<number>('--offset', line.dom);
      
            if (index === savedIndex) {
                button.classList.add(styles.active);
            } else { 
                button.classList.remove(styles.active);
            }
        });
    });
    
    const onLeft = () => {
        const old = getCssVariable<number>('--offset', line.dom);
        const offset = ( ((old + images.length) - 1) % images.length).toString();

        line.dom.style.setProperty('--offset', offset);
    };

    const onRight = () => {
        const old = getCssVariable<number>('--offset', line.dom);
        const offset = ((old + 1) % images.length).toString();

        line.dom.style.setProperty('--offset', offset);
    };
    
    const loop = () => {
        clearTimeout(timer);
                
        timer = setTimeout(() => {
            onRight();

            loop();    
        }, timeout);    
    };

    line
        .onMount(() => {
            loop();
        })
        .onUnMount(() => {
            clearTimeout(timer);
            mutation();
        });
    
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ 
                    line.dom,
                    dots.dom,

                    new Button({
                        className: styles.left,
                        children: [
                            new Icon('ChevronLeft', {
                                size: 50,
                                stroke: 'rgba(255,255,255,0.6)',
                            }).dom 
                        ],
                        events: {
                            onclick: () => {
                                onLeft();
                                loop();
                            },
                        },
                    }).dom,

                    new Button({
                        className: styles.right,
                        children: [
                            new Icon('ChevronRight', {
                                size: 50,
                                stroke: 'rgba(255,255,255,0.6)',
                            }).dom 
                        ],
                        events: {
                            onclick: () => {
                                onRight();
                                loop();
                            },
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Carousel;
