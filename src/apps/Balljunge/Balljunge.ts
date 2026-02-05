import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/balljunge.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Typography from '$uikit/Typography';
import Scroll from '$uikit/Scroll/Scroll';
import Button from '$uikit/Button';

function Balljunge(props?:AppProps) { 
    return (
        new App({
            name: 'Balljunge',
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
                                            text: 'Balljunge', variant: 'title1-regular', className: styles.title,
                                        }).dom,

                                        new Typography({
                                            text: 'Soccer players statistic collector app.', variant: 'title3-regular',
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
                                                        text: 'Type script, React Native CLI ', 
                                                        isInline: true,
                                                    }).dom
                                                ],
                                            },
                                        }).dom,
                                
                                        new Typography({
                                            text: 'Key contributions', 
                                            variant: 'body-emphasized',
                                            style: {
                                                margin: '20px 0 10px 0', color: 'var(--accents-blue)', 
                                            },
                                        }).dom,

                                        new Typography({
                                            text: 'Balljunge is an app the target of which are football clubs and trainers. The trainers or the invited assistants can record the match actions and get the effectiveness statistics of the team both per player and per game. The uniqueness of the app is also the subscription plans (3 subscription plans-Bambini, Junior, Pro). Each plan has a different UI engaging more actions for recording than the previous one. This makes the app usage wider from law class clubs to professional football clubs and trainers.', 
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
                                                                window.open('https://beewebsystems.com/works/Balljunge', '_blank');
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
                minHeight: 330,
            }),
        })
    );
}

export default Balljunge;
