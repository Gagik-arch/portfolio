import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';
import Typography from '$uikit/Typography';
import f1 from './images/f1.avif';
import f3 from './images/f2.avif';
import f4 from './images/f3.avif';
import { Element } from '@nuvo-js/core';
import Carousel from '$uikit/Carousel';
import Scroll from '$uikit/Scroll';
import Link from '$uikit/Link';

function Axis(props?:AppProps) { 
    return (
        new App({
            name: 'Axis',
            appIcon: APP_IMAGES.Axis,
            isNative: true,
            window: new Window({
                className: styles.root,
                backgroundColor: 'rgba(0,0,0,0.9)',
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.carousel,
                            children: [
                                new Carousel({
                                    images: [
                                        f1,
                                        f3,
                                        f4
                                    ],
                                }).dom
                            ],
                        },
                    }).dom,
          
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.content,
                            children: [ 
                                new Scroll({
                                    children: [
                                        new Typography({
                                            text: 'Axis', variant: 'title1-regular', className: styles.title,
                                        }).dom,
                                
                                        new Typography({
                                            text: '2D graphics engine from scratch using HTML Canvas + TypeScript', variant: 'title3-regular',
                                            className: styles.subtitle,
                                        }).dom,

                                        new Typography({
                                            text: 'Desktop browser', variant: 'headline-regular',
                                            className: styles.subtitle,
                                        }).dom,
                                
                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                style: {
                                                    margin: '10px 0',
                                                },
                                                children: [
                                                    new Typography({
                                                        text: 'Used technologies: ', 
                                                        isInline: true,
                                                        variant: 'body-emphasized',
                                                    }).dom,
                                                    new Typography({
                                                        text: 'NuvoJS, Typescript', 
                                                        isInline: true,
                                                    }).dom
                                                ],
                                            },
                                        }).dom,

                                        new Typography({
                                            text: 'After spending time working on graphics programming, I created my own 2D engine focused on interactive editing and rendering.', 
                                        }).dom,
                                
                                        new Typography({
                                            text: 'Key contributions', 
                                            variant: 'body-emphasized',
                                            style: {
                                                margin: '20px 0 10px 0', color: 'var(--accents-blue)', 
                                            },
                                        }).dom,
                                
                                        new Element<HTMLUListElement>({
                                            tagName: 'ul',
                                            props: {
                                                className: styles.list,
                                                children: [
                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Custom virtual canvas with camera system.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Zooming and panning with world coordinates.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Shape rendering system (Rectangle, Polygon, Ellipse.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Object selection and manipulation.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Resizing with anchors and rotated shapes support.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Coordinate transformations and vector mathematics.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Snapping and ruler system.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Custom rendering pipeline without external graphics libraries.', 
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom
                                                  
                                                ],
                                            },
                                        }).dom,

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                className: styles.toggle_container,
                                                children: [
                                                    new Link({
                                                        variant: 'primary',
                                                        href: 'https://axis-demo-app.netlify.app/',
                                                        target: '_blank',
                                                        children: [ 'View' ],
                                                    }).dom
                                                ],
                                            },
                                        }).dom
                                    ],
                                }).dom
                            ],
                        },
                    }).dom

                ],
                width: props?.width,
                height: props?.height,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
                minWidth: 900,
                minHeight: 500,
            }),
        })
    );
}

export default Axis;
