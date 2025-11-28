import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/datewise256.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Typography from '$uikit/Typography';
import Scroll from '$uikit/Scroll/Scroll';
import Button from '$uikit/Button';

function Datewise(props?:AppProps) { 
    return (
        new App({
            name: 'Datewise',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.content,
                            children: [ 
                                new Scroll({
                                    children: [
                                        new Typography({
                                            text: 'Datewise', variant: 'title1-regular', className: styles.title,
                                        }).dom,

                                        new Typography({
                                            text: 'Lightweight Calendar & Date Management npm library', variant: 'title3-regular',
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
                                                        text: 'Type script.', 
                                                        isInline: true,
                                                    }).dom
                                                ],
                                            },
                                        }).dom,
                                
                                        new Typography({
                                            text: 'Key contributions:', 
                                            variant: 'body-emphasized',
                                            style: {
                                                margin: '20px 0 10px 0', color: 'var(--accents-blue)', 
                                            },
                                        }).dom,

                                        new Typography({
                                            text: 'datewise is a minimal, developer-friendly JavaScript/TypeScript library for generating and managing calendar data. Instead of focusing on heavy date arithmetic, it provides a structured way to build calendars, date pickers, and scheduling interfaces by exposing month, week, and day metadata in an intuitive format.', 
                                        }).dom,

                                        new Typography({
                                            style: {
                                                margin: '20px 0',
                                            },
                                            text: 'The library offers a simple Calendar class that outputs localized month names, weekday labels, and an array of day objects—each containing the underlying Date instance and contextual status (such as whether it belongs to the current month). It also includes navigation helpers like moving to previous/next months or years, selecting dates, and switching locales dynamically.', 
                                        }).dom,

                                        new Typography({
                                            text: 'With a clean API, no external dependencies, and built-in TypeScript support, datewise is ideal for building custom calendar components, booking flows, or any UI that requires date visualization and lightweight date handling.', 
                                        }).dom,

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                className: styles.toggle_container,
                                                children: [
                                                    new Button({
                                                        children: [ 'Vie demo' ],
                                                        variant: 'secondary',
                                                        events: {
                                                            onclick: () => {
                                                                window.open('https://datewise-khaki.vercel.app/', '_blank');
                                                            },
                                                        },
                                                    }).dom,
                                                    new Button({
                                                        children: [ 'View npm' ],
                                                        variant: 'primary',
                                                        events: {
                                                            onclick: () => {
                                                                window.open('https://www.npmjs.com/package/datewise', '_blank');
                                                            },
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
                minWidth: 500,
                minHeight: 400,
            }),
        })
    );
}

export default Datewise;
