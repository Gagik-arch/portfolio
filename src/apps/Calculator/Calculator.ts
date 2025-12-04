/* eslint-disable no-useless-escape */
import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import Element from '$lib/Element';
import Icon from '$uikit/Icon';
import Button from '$uikit/Button';
import Store from '$lib/store';

function Calculator(props?: AppProps) { 
    const state = new Store('');

    const availableActions = [
        '.',
        '=',
        '+',
        '-',
        '/',
        '*',
        '%',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'enter',
        'backspace'
    ];
    
    const text = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: `title3 ${styles.text}`,   
        },
    });
    
    const calculate = (num:string | undefined, action:string | undefined) => {
        console.log(num, action);

        const parts = state.getState()
            .split(/[\%\+\-\/\*]/);
        
        const lastPart = parts
            .at(-1);
        
        switch (action) {
                case 'backspace':
                    state.setState(prev => prev.slice(0, -1));
                    break;
                case 'clear':
                    state.setState('');
                    break;
                case 'plusSlashMinus':
                    if (!lastPart) break;
                
                    const p = parts.slice(0, parts.length - 1);
                    const lastPartNumber = +lastPart; 
                    console.log(p);
                    p.push((lastPartNumber * -1).toString());
                
                    state.setState(p.join(''));
                    break;
                case '.':
                    if (lastPart?.includes('.')) break;
                
                    const lastChar = lastPart?.at(-1);
                    const isAvailableLastNumber = lastChar ? !isNaN(+lastChar) : false;
            
                    if (!isAvailableLastNumber) {
                        state.setState(prev => prev + '0.');
                        break;
                    } 
            
                    state.setState(prev => lastPart?.length ? prev + '.' : '0.');
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    const _lastChar = lastPart?.at(-1);
                    const _isAvailableLastNumber = _lastChar ? !isNaN(+_lastChar) : false;
                
                    if (!state.getState().length) break;
                    
                    if (_lastChar === '.') {
                        state.setState(prev => prev.replace('.', '') + action);
                        break;
                    } 
                
                    if (!_isAvailableLastNumber) break;

                    state.setState(prev => prev + action);
                    break;
                case 'enter':
                case '=':
                    state.setState(prev => eval(prev) + '');
                    break;
                default:
                    break;
        }
        const width = text.dom.getBoundingClientRect().width;

        if (state.getState().length) { 

            // console.log( (state.getState().length ));
        }

        if (num) { 
            state.setState(prev => {
                return prev + num;
            });
        }
    };

    const onClickWrapper = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!target.closest('.' + styles.button)) return; 
        const name = target.dataset.name;

        if (!name) return;

        const num = isNaN(+name) ? undefined : name;
        const action = isNaN(+name) ? name : undefined;
      
        calculate(num, action);
    };
    
    const onKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (!availableActions.includes(key) ) return; 
        
        const num = isNaN(+key) ? undefined : key;
        const action = isNaN(+key) ? key : undefined;

        calculate(num, action);
    };
    
    return (
        new App({
            name: 'Calculator',
            appIcon,
            isNative: true,
            window: new Window({
                events: { onkeyup: onKeyUp },
                children: [
                    text
                        .onMount((e) => {
                            state.effect((prev) => {
                                e.setProps({
                                    children: [ prev ],
                                }, true);
                            });
                        })
                        .dom,
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            events: {
                                onclick: onClickWrapper,
                            },
                            className: styles.buttons,    
                            children: [
                                new Button({
                                    className: styles.button,
                                    'data-name': 'backspace',
                                    children: [ 
                                        new Icon('Backdrop',
                                            {
                                                size: 30, color: 'white', 
                                            }).dom 
                                    ],
                                }).dom,
                                new Button({
                                    className: `${styles.button} title1 regular`,
                                    'data-name': 'clear',
                                    children: [ 'AC' ],
                                }).dom,
                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '%',
                                    children: [ '%' ],
                                }).dom,

                                new Button({
                                    className: styles.button,
                                    'data-name': '/',
                                    children: [ 
                                        new Icon('Divide',
                                            {
                                                size: 30, color: 'white', 
                                            }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '7',
                                    children: [ '7' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '8',
                                    children: [ '8' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '9',
                                    children: [ '9' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} title1 regular`,
                                    'data-name': '*',
                                    children: [ '✖' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '4',
                                    children: [ '4' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '5',
                                    children: [ '5' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '6',
                                    children: [ '6' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '-',
                                    children: [ 
                                        new Icon('Minus',
                                            {
                                                size: 24, color: 'white', 
                                            }).dom 
                                    ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '1',
                                    children: [ '1' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} title1 regular`,
                                    'data-name': '2',
                                    children: [ '2' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '3',
                                    children: [ '3' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '+',
                                    children: [ '+' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': 'plusSlashMinus',
                                    children: [ 
                                        new Icon('PlusSlashMinus', {
                                            color: 'white',
                                            size: 50,
                                        }).dom
                                    ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '0',
                                    children: [ '0' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '.',
                                    children: [ '.' ],
                                }).dom,

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '=',
                                    children: [ '=' ],
                                }).dom
                            ],
                       
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
