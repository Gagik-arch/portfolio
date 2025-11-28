import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/preview.png';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import Element from '$lib/Element';
import Typography from '$uikit/Typography';
import Scroll from '$uikit/Scroll/Scroll';
import Button from '$uikit/Button';
import src from './gagik-chilingaryan-cv.pdf';
import json from './reactive_resume-clq4rvkzx027jpbpu032kjehk.json';

function CV(props?:AppProps) { 
    return (
        new App({
            name: 'CV',
            appIcon,
            window: new Window({
                className: styles.root,
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.content,
                            children: [
                                new Typography({
                                    className: styles.text_center,
                                    text: json.basics.name, variant: 'title1-emphasized', 
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

export default CV;
