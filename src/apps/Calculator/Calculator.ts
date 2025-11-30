import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import Element from '$lib/Element';
import Icon from '$uikit/Icon';
import Typography from '$uikit/Typography';
import Button from '$uikit/Button';

function Calculator(props?: AppProps) { 
    const buttons = [
        new Icon('Backdrop',
            {
                size: 30, color: 'white', 
            }).dom, 
        
        new Typography({
            text: 'AC',
            variant: 'title1-regular',
        }).dom,

        new Typography({
            text: '%',
            variant: 'largeTitle-regular',
        }).dom,

        new Icon('Divide',
            {
                size: 30, color: 'white', 
            }).dom, 

        new Typography({
            text: '7',
            variant: 'largeTitle-regular',
        }).dom,

        new Typography({
            text: '8',
            variant: 'largeTitle-regular',
        }).dom,

        new Typography({
            text: '9',
            variant: 'largeTitle-regular',
        }).dom,

        new Typography({
            text: '✖',
            variant: 'title2-emphasized',
        }).dom,
        
        new Typography({
            text: '4',
            variant: 'largeTitle-regular',
        }).dom,
        
        new Typography({
            text: '5',
            variant: 'largeTitle-regular',
        }).dom,
        
        new Typography({
            text: '6',
            variant: 'largeTitle-regular',
        }).dom,

        new Icon('Minus',
            {
                size: 30, color: 'white', 
            }).dom, 
        
        new Typography({
            text: '1',
            variant: 'largeTitle-regular',
        }).dom,
        
        new Typography({
            text: '2',
            variant: 'largeTitle-regular',
        }).dom,
        
        new Typography({
            text: '3',
            variant: 'largeTitle-regular',
        }).dom,

        new Typography({
            text: '+',
            variant: 'largeTitle-regular',
        }).dom,
        
        new Icon('PlusSlashMinus', {
            color: 'white',
            size: 50,
        }).dom,

        new Typography({
            text: '0',
            variant: 'largeTitle-regular',
        }).dom,
        
        new Typography({
            text: '.',
            variant: 'largeTitle-regular',
        }).dom,
  
        new Typography({
            text: '=',
            variant: 'largeTitle-regular',
        }).dom
    ];

    return (
        new App({
            name: 'Calculator',
            appIcon,
            isNative: true,
            window: new Window({
                children: [
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.text,   
                            children: [ '0' ],
                        },
                    }).dom,
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.buttons,    
                            children: buttons.map(b => {
                                return (
                                    new Button({
                                        className: styles.button,
                                        children: [ b ],
                                    }).dom
                                );
                            }),
                        },
                    }).dom
                ],
                className: styles.root,
                backgroundColor: 'rgba(32,32,32,0.95)',
                isResizable: false,
                minWidth: 320,
                minHeight: 480,
                x: props?.x,
                y: props?.y,
                id: props?.id,
                key: props?.key,
            }),
        })
    );
}

export default Calculator;
