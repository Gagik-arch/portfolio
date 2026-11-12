import App from '$components/App';
import Window from '$components/Window';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import { APP_IMAGES } from '$utils/constants';
import Carousel from '$uikit/Carousel';
import { Element } from '@nuvo-js/core';
import Tabs from '$uikit/Tabs';
import Scroll from '$uikit/Scroll';

function Npm_Packages(props?:AppProps) { 
    return (
        new App({
            name: 'Npm-packages',
            appIcon: APP_IMAGES['Npm-packages'],
            isNative: true,
            window: new Window({
                className: styles.root,
                backgroundColor: 'rgba(0,0,0,0.9)',
                children: [ 
                    new Tabs({
                        tabs: [
                            'Npm',
                            'Datesize'
                        ],
                        className: styles.tabs,
                    }).dom,
                    
                    new Scroll({
                        children: [

                            // new Carousel({
                            //     showToggles: false,
                            //     views: [
                            //         new Element<HTMLDivElement>({
                            //             tagName: 'div',
                            //             props: {
                            //                 className: styles.view,
                            //                 children: [ 'ad' ],
                            //             },
                            //         }).dom,

                            //         new Element<HTMLDivElement>({
                            //             tagName: 'div',
                            //             props: {
                            //                 className: styles.view,
                            //                 children: [ 'ad' ],
                            //             },
                            //         }).dom
                            //     ],
                            // }).dom
                        ],
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

export default Npm_Packages;
