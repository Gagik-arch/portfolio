import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';
import Typography from '$uikit/Typography';
import { clsx } from '$utils/clsx';
import f1 from './images/f1.avif';
import f3 from './images/f2.avif';
import f4 from './images/f3.avif';
import { Element } from '@nuvo-js/core';
import Carousel from '$uikit/Carousel';
import Button from '$uikit/Button';
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
                                            text: 'Cross-Platform Engineer-Advertisement', variant: 'title3-regular',
                                            className: styles.subtitle,
                                        }).dom,

                                        new Typography({
                                            text: 'Android · Windows', variant: 'headline-regular',
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
                                                        text: 'React Native Expo, Electron js, Node js, Windows API, WebSocket.', 
                                                        isInline: true,
                                                    }).dom
                                                ],
                                            },
                                        }).dom,

                                        new Typography({
                                            text: 'At Advelit, I develop high-performance cross-platform solutions for Android and Windows, focusing on digital signage, kiosk systems, and advertisement display technologies.', 
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
                                                                    text: 'React Native Development: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Built and maintained advanced React Native applications with deep native module integrations to deliver seamless, high-performance user experiences.', 
                                                                    isInline: true,
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Android Native Development: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Built and optimized Android features tailored for digital signage, ensuring compatibility across various devices and OS versions.', 
                                                                    isInline: true,
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Electron.js Desktop Application: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Created secure and efficient Windows desktop apps using Electron.js, integrating with hardware, system APIs, and local resources.', 
                                                                    isInline: true,
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Enterprise & Advertisement Features: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Implemented kiosk mode, SYSTEM_ALERT_WINDOW overlays, device monitoring, and low-level permissions essential for advertising displays and enterprise deployments.', 
                                                                    isInline: true,
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Complex Debugging: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Resolved challenging issues involving JavaScript, native modules, thread management, and multi-platform dependencies.', 
                                                                    isInline: true,
                                                                }).dom
                                                            ],
                                                        },
                                                    }).dom,

                                                    new Element<HTMLLIElement>({
                                                        tagName: 'li',
                                                        props: {
                                                            children: [
                                                                new Typography({
                                                                    text: 'Clean & Scalable Code: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Wrote modular, maintainable, and well-documented code aligned with internal standards and deployment pipelines.', 
                                                                    isInline: true,
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
