import { Element } from '@nuvo-js/core';
import type { CarouselProps } from './types';
import styles from './style.module.css';
import Image from '$uikit/Image';
import Button from '$uikit/Button';
import {
    getCssVariable, onCssVariableChange, setCSSVariable 
} from '$utils/index';
import Icon from '$uikit/Icon';
import { clsx } from '$utils/clsx';

class Carousel extends Element<HTMLDivElement> { 
    public constructor({
        showToggles = true,
        images,
        timeout = 5000,
        views = [],
        togglesClassName,
        onChange,
        stopAutoSlide = false,
        showDots = true,
    }:CarouselProps) {
        const stack = images || views;
        let timer: number | undefined;
    
        const line = new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.line,
                style: {
                    gridTemplateColumns: `repeat(${stack.length}, 100%)`,
                },
                children: images
                    ? images.map(img => {
                        return (
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    children: [
                                        new Image({
                                            className: styles.image,
                                            src: img,
                                        }).dom
                                    ],
                                },
                            }).dom
                        );
               
                    })
                    : views.map(view => view),
            },
        });

        const dots = showDots
            ? new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    className: styles.dots,
                    children: stack.map((_, index) => {
                        return (
                            new Button({
                                className: index === 0 ? styles.active : undefined,
                                events: {
                                    onclick: () => {
                                        setCSSVariable('--offset', index.toString(), line.dom);
                                    },
                                },
                            }).dom
                        );
                    }),
                },
            })
            : undefined; 
  
        const mutation = onCssVariableChange(line.dom, '--offset', (value) => {
            if (value && isNaN(+value)) { 
                onChange?.(+value);
            }
            const savedIndex = getCssVariable<number>('--offset', line.dom);

            if (!dots) return; 

            const dotButtons = dots.dom.querySelectorAll('button');
        
            dotButtons.forEach((button, index) => {
                if (index === savedIndex) {
                    button.classList.add(styles.active);
                } else { 
                    button.classList.remove(styles.active);
                }
            });
        });
    
        const onLeft = () => {
            const old = getCssVariable<number>('--offset', line.dom) || 0;
            const offset = ( ((old + stack.length) - 1) % stack.length).toString();

            line.dom.style.setProperty('--offset', offset);
        };

        const onRight = () => {
            const old = getCssVariable<number>('--offset', line.dom) || 0;
            const offset = ((old + 1) % stack.length).toString();

            line.dom.style.setProperty('--offset', offset);
        };
    
        const loop = () => {
            if (stopAutoSlide) return; 
            
            clearTimeout(timer);
                
            timer = setTimeout(() => {
                onRight();

                loop();    
            }, timeout);    
        };

        line
            .OnMount(() => {
                loop();
            })
            .OnUnMount(() => {
                clearTimeout(timer);
                mutation();
            });

        super({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ 
                    line.dom,
                    dots?.dom,

                    (showToggles
                        ? new Element<HTMLDivElement>({
                            tagName: 'div',
                            props: {
                                className: clsx(styles.toggles, togglesClassName),
                                children: [
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
                        : null )
                ],
            },
        });
    }

    public SetOffset (index:number) {
        const line = this.dom.querySelector(`.${styles.line}`) as HTMLElement | undefined;
  
        setCSSVariable('--offset', index.toString(), line);
    }
}

export default Carousel;
