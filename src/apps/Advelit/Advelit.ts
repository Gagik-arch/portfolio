import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/advelit.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Carousel from '$uikit/Carousel';
import Typography from '$uikit/Typography';
import Scroll from '$uikit/Scroll/Scroll';
import splash from './images/splash.jpg';
import f1 from './images/f1.jpg';
import f3 from './images/f3.jpg';
import f4 from './images/f4.jpg';
import f5 from './images/f5.jpg';
import f6 from './images/f6.jpg';
import f8 from './images/f8.jpg';
import Button from '$uikit/Button';

function Advelit(props?:AppProps) { 
    return (
        new App({
            name: 'Advelit',
            appIcon,
            window: new Window({
                className: styles.root,
                backgroundColor: 'rgba(0,0,0,0.9)',
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.carousel,
                            children: [
                                Carousel({
                                    images: [
                                        splash,
                                        f1,
                                        f3,
                                        f4,
                                        f5,
                                        f6,
                                        f8
                                    ],
                                }) 
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
                                            text: 'Advelit', variant: 'title1-regular', className: styles.title,
                                        }).dom,

                                        new Typography({
                                            text: 'React Native Engineer — Video Streaming Platform', variant: 'title3-regular',
                                            className: styles.subtitle,
                                        }).dom,

                                        new Typography({
                                            text: 'Android · iOS · WebOS · TizenOS', variant: 'headline-regular',
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
                                                        text: 'React Native Expo, Type script.', 
                                                        isInline: true,
                                                    }).dom
                                                ],
                                            },
                                        }).dom,

                                        new Typography({
                                            text: 'Built and maintained a fully cross-platform video streaming application using React Native, delivering a smooth, high-performance experience across (Android/Apple) and smart TVs (LG WebOS, Samsung Tizen).', 
                                        }).dom,
                                
                                        new Typography({
                                            text: 'Key contributions:', 
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
                                                                    text: 'Advanced Video Playback: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Implemented custom video players with HLS/DASH, DRM support, adaptive streaming, and reliable offline playback.', 
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
                                                                    text: 'Native Integrations: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Developed platform-specific native modules to enhance performance, ensure compatibility, and unlock device-level features.', 
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
                                                                    text: 'TV UI/UX: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Designed intuitive, remote-friendly TV interfaces with smooth focus management, directional navigation, and layouts optimized for large screens.', 
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
                                                                    text: 'Backend Collaboration: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Integrated REST APIs for authentication, personalized recommendations, session management, and analytics tracking.', 
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
                                                                    text: 'Performance Optimization: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Reduced app startup time, improved memory usage, and resolved critical production issues to boost stability on all supported devices.', 
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
                                                                new Button({
                                                                    children: [ 'View' ],
                                                                    variant: 'primary',
                                                                    events: {
                                                                        onclick: () => {
                                                                            window.open('https://www.advelit.com/', '_blank');
                                                                        },
                                                                    },
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

export default Advelit;
