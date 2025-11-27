import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/fibi.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Carousel from '$uikit/Carousel';
import splash from './images/splash.png';

function Fibi(props?:AppProps) { 
    return (
        new App({
            name: 'Fibi',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            children: [
                                Carousel({
                                    images: [
                                        splash,
                                        splash,
                                        splash
                                    ],
                                }) 
                            ],
                        },
                    }).dom,
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            children: [ 
                                `
                                React Native Engineer
Video Streaming Application – Android, iOS, WebOS, Tizen

Developed and maintained a cross-platform video streaming application using React Native, optimized for Android, iOS, LG WebOS, and Samsung Tizen smart TVs.

Implemented video playback features with custom players, adaptive streaming (HLS/DASH), DRM support, and offline playback.

Integrated platform-specific native modules for performance optimization and seamless compatibility across diverse devices.

Built responsive and intuitive TV user interfaces with remote navigation, focus management, and optimized layouts for large screens.

Collaborated with backend teams to integrate REST APIs, ensuring smooth authentication, personalized content, and analytics tracking.

Improved app performance and stability by optimizing memory usage, reducing startup time, and fixing critical production issues.`
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
                minWidth: 800,
                minHeight: 500,
            }),
        })
    );
}

export default Fibi;
