import i1 from './images/splash.jpg';
import i2 from './images/login.jpg';
import i3 from './images/choose-avatar.jpg';
import i4 from './images/sidebar.jpg';
import i5 from './images/view.jpg';
import i6 from './images/program.jpg';
import i7 from './images/lang.jpg';
import i8 from './images/pin.jpg';
import i9 from './images/sign-out.jpg';
import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/fibi.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Carousel from '$uikit/Carousel';
import Typography from '$uikit/Typography';
import Scroll from '$uikit/Scroll';

function Fibi(props?:AppProps) { 
    return (
        new App({
            name: 'Fibi',
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
                                        i1,
                                        i2,
                                        i3,
                                        i4,
                                        i5,
                                        i6,
                                        i7,
                                        i8,
                                        i9
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
                                            text: 'Fibi', variant: 'title1-regular', className: styles.title,
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
                                                                    text: 'User Interface Execution: ', 
                                                                    isInline: true,
                                                                    variant: 'body-emphasized',
                                                                }).dom,
                                                                new Typography({
                                                                    text: 'Worked closely with designers to deliver clean, responsive, and visually appealing UIs optimized for large screens.', 
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

export default Fibi;
