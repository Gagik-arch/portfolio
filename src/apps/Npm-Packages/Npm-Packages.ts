import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';
import Carousel from '$uikit/Carousel';
import { Element } from '@nuvo-js/core';
import Tabs from '$uikit/Tabs';
import Scroll from '$uikit/Scroll';
import nuvo from './nuvo';
import datewise from './datewise';
import Typography from '$uikit/Typography';

function Npm_Packages(props?: AppProps) { 
    const carousel = new Carousel({
        stopAutoSlide: true,
        showToggles: false,
        showDots: false,
        views: [

            // new Element<HTMLDivElement>({
            //     tagName: 'div',
            //     props: {
            //         style: {

            //             // padding: '20px',
            //         },
            //         children: [
            //             'asd'

            //             // new Scroll({
            //             //     className: styles.scroll,
            //             //     children: [ nuvo.dom ],
            //             // }).dom
            //         ],
            //     },
            // }).dom, 

            '1',
            '2'

            // new Scroll({
            //     className: styles.scroll,
            //     children: [ nuvo.dom ],
            // }).dom,
            // new Scroll({
            //     className: styles.scroll,
            //     children: [ datewise.dom ],
            // }).dom                          
        ],
    });

    return (
        new App({
            name: 'Npm-packages',
            appIcon: APP_IMAGES['Npm-packages'],
            isNative: false,
            window: new Window({
                className: styles.root,
                children: [ 
                    carousel.dom
                    
                    // new Tabs({
                    //     tabs: [
                    //         new Typography({
                    //             text: 'Nuvo', variant: 'body-emphasized', 
                    //         }).dom,
                    //         new Typography({
                    //             text: 'Datesize', variant: 'body-emphasized', 
                    //         }).dom 
                    //     ],
                    //     className: styles.tabs,
                    // })
                    //     .OnChangeSelection((v) => {
                    //         carousel.SetOffset(v);
                    //     }).dom
                ],
                width: props?.width,
                height: props?.height,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
            }),
        })
    );
}

export default Npm_Packages;
