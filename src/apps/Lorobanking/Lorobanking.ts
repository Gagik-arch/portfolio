import App from '$components/App';
import Window from '$components/Window';
import type { AppProps } from '$apps/types';
import styles from './style.module.css';
import { Element } from '@nuvo-js/core';
import Typography from '$uikit/Typography';
import Scroll from '$uikit/Scroll/Scroll';
import { APP_IMAGES } from '$utils/constants';
import { clsx } from '$utils/clsx';

function Lorobanking(props?:AppProps) { 
    return (
        new App({
            name: 'Lorobanking',
            appIcon: APP_IMAGES.Lorobanking,
            window: new Window({
                className: styles.root,
                children: [ 
                    new Element<HTMLDivElement>('div', {
                        className: styles.content,
                        children: [ 
                            new Scroll({
                                children: [
                                    new Typography({
                                        className: clsx( styles.title),
                                        text: 'Lorobanking',
                                        variant: 'title2-emphasized',
                                    }).dom,

                                    new Typography({
                                        text: 'Contributed to a SWIFT-based international transaction processing system for banking operations.', variant: 'title3-regular',
                                        className: styles.subtitle,
                                    }).dom,

                                    new Element<HTMLDivElement>('div', {
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
                                                text: 'Type script, React, Tailwind,', 
                                                isInline: true,
                                            }).dom
                                        ],
                                    }).dom,
                                
                                    new Typography({
                                        text: 'Key contributions', 
                                        variant: 'body-emphasized',
                                        style: {
                                            margin: '20px 0 10px 0', color: 'var(--accents-blue)', 
                                        },
                                    }).dom,

                                    new Typography({
                                        text: ' Implemented MT message parsing, validation, and routing functionality within the transaction workflow.', 
                                    }).dom
                                       
                                ],
                            }).dom
                        ],
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

export default Lorobanking;
