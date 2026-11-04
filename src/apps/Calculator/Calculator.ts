
import App from '$components/App';
import Window from '$components/Window';
import appIcon from '$assets/images/app-icons/calculator.png';
import styles from './style.module.css';
import type { AppProps } from '$apps/types';
import Element from '$lib/Element';
import Icon from '$uikit/Icon';
import Button from '$uikit/Button';
import Store from '$lib/store';
import { rangeNumber } from '$utils/index';
import { evaluateExpression } from './utils';

function Calculator(props?: AppProps) {
    const expression = new Store('');
    const result = new Store('');

    const operators = [
        '+',
        '-',
        '*',
        '/',
        '%' 
    ];

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
        'backspace',
        'clear',
        'delete'
    ];

    let backspaceTimer: number | undefined;

    const text = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: `regular ${styles.text}`,
        },
    });

    const resultContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: `regular ${styles.result}`,
        },
    });

    const isOperator = (char?: string) => !!char && operators.includes(char);

    const getCurrentNumber = (value: string) => {
        const parts = value.split(/[+\-*/%]/);
        return parts.at(-1) || '';
    };

    const updateDisplay = () => {
        const width = 394;
        const factor = 0.6;

        const currentExpression = expression.GetState();
        const currentResult = result.GetState();

        const fontSize = rangeNumber(
            width / (Math.max(1, currentExpression.length) * factor),
            14,
            40
        );

        text.SetProps({
            style: {
                fontSize: `${fontSize}px`,
            },
        });

        resultContainer.SetProps({
            style: {
                fontSize: `${Math.min(
                    24,
                    width / (Math.max(1, currentResult.length) * factor)
                )}px`,
            },
        });
    };

    const updateResult = () => {
        const value = expression.GetState();

        if (!value || isOperator(value.at(-1))) {
            result.SetState('');
            return;
        }

        try {
            const calculated = evaluateExpression(value);

            result.SetState(
                Number.isFinite(calculated)
                    ? String(calculated)
                    : ''
            );
        } catch {
            result.SetState('');
        }
    };

    const clearLongPressTimer = () => {
        if (backspaceTimer === undefined) return;

        clearTimeout(backspaceTimer);
        backspaceTimer = undefined;
    };

    const backspaceLongHold = () => {
        if (!expression.GetState().length) return;

        clearLongPressTimer();

        backspaceTimer = setTimeout(() => {
            expression.SetState('');
            result.SetState('');
            backspaceTimer = undefined;
        }, 1000);
    };

    const appendNumber = (num: string) => {
        const current = expression.GetState();

        const next = current + num;

        expression.SetState(next);
        updateResult();
    };

    const appendDecimal = () => {
        const current = expression.GetState();
        const currentNumber = getCurrentNumber(current);

        if (currentNumber.includes('.')) return;

        if (!current || isOperator(current.at(-1))) {
            expression.SetState(current + '0.');
        } else {
            expression.SetState(current + '.');
        }

        updateResult();
    };

    const appendOperator = (operator: string) => {
        const current = expression.GetState();

        if (!current) {
            if (operator === '-') {
                expression.SetState('-');
            }
            return;
        }

        const lastChar = current.at(-1);

        if (isOperator(lastChar)) {
            if (operator === '-' && lastChar !== '-') {
                expression.SetState(current + operator);
                return;
            }

            expression.SetState(
                current.slice(0, -1) + operator
            );
        } else {
            expression.SetState(current + operator);
        }

        updateResult();
    };

    const toggleSign = () => {
        const current = expression.GetState();

        if (!current) {
            expression.SetState('-');
            return;
        }

        const lastOperatorIndex = Math.max(
            current.lastIndexOf('+'),
            current.lastIndexOf('-'),
            current.lastIndexOf('*'),
            current.lastIndexOf('/'),
            current.lastIndexOf('%')
        );

        const number = current.slice(lastOperatorIndex + 1);

        if (!number) return;

        const previous = current.slice(0, lastOperatorIndex + 1);

        if (number.startsWith('-')) {
            expression.SetState(previous + number.slice(1));
        } else {
            expression.SetState(previous + '-' + number);
        }

        updateResult();
    };

    const calculate = (
        num?: string,
        action?: string
    ) => {
        try {
            switch (action) {
                    case 'backspace':
                    case 'delete': {
                        expression.SetState(
                            prev => prev.slice(0, -1)
                        );

                        updateResult();
                        break;
                    }

                    case 'clear': {
                        expression.SetState('');
                        result.SetState('');
                        break;
                    }

                    case 'plusSlashMinus': {
                        toggleSign();
                        break;
                    }

                    case '.': {
                        appendDecimal();
                        break;
                    }

                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%': {
                        appendOperator(action);
                        break;
                    }

                    case '=':
                    case 'enter': {
                        const current = expression.GetState();

                        if (
                            !current
                            || isOperator(current.at(-1))
                            || current === '-'
                        ) {
                            break;
                        }

                        const value = evaluateExpression(current);

                        if (!Number.isFinite(value)) {
                            throw new Error('Invalid result');
                        }

                        expression.SetState(String(value));
                        result.SetState('');
                        break;
                    }

                    default:
                        break;
            }

            if (num !== undefined) {
                appendNumber(num);
            }
        } catch {
            result.SetState('Error');
        }

        updateDisplay();
    };

    const onClickWrapper = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        const button = target.closest(
            '.' + styles.button
        );

        if (!button) return;

        const name = (button as HTMLElement).dataset.name;

        if (!name) return;

        const num = /^\d$/.test(name)
            ? name
            : undefined;

        const action = num === undefined
            ? name
            : undefined;

        calculate(num, action);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();

        if (!availableActions.includes(key)) return;

        if (key === 'backspace' || key === 'enter') {
            e.preventDefault();
        }

        if (e.repeat && key !== 'backspace') return;

        const num = /^\d$/.test(key)
            ? key
            : undefined;

        const action = num === undefined
            ? key
            : undefined;

        calculate(num, action);
    };

    expression.Subscribe(() => {
        updateResult();

        text.SetProps({
            children: [ expression.GetState() ],
        }, true);
    });

    result.Subscribe((prev) => {
        resultContainer.SetProps({
            children: [ prev ],
        }, true);
    });

    return (
        new App({
            name: 'Calculator',
            appIcon,
            isNative: true,
            window: new Window({
                events: {
                    onkeydown: onKeyDown,
                    onkeyup: clearLongPressTimer,
                },
                children: [
                    resultContainer.dom,

                    text
                        .OnMount((e) => {
                            expression.Effect((prev) => {
                                e.SetProps({
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
                                    events: {
                                        onmousedown: backspaceLongHold,
                                        onmouseup: clearLongPressTimer,
                                        onmouseleave: clearLongPressTimer,
                                    },
                                    children: [
                                        new Icon('Backdrop', {
                                            size: 30,
                                            color: 'white',
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
                                        new Icon('Divide', {
                                            size: 30,
                                            color: 'white',
                                        }).dom
                                    ],
                                }).dom,

                                ...[
                                    '7',
                                    '8',
                                    '9' 
                                ].map(num => new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': num,
                                    children: [ num ],
                                }).dom),

                                new Button({
                                    className: `${styles.button} title1 regular`,
                                    'data-name': '*',
                                    children: [ '✖' ],
                                }).dom,

                                ...[
                                    '4',
                                    '5',
                                    '6' 
                                ].map(num => new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': num,
                                    children: [ num ],
                                }).dom),

                                new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': '-',
                                    children: [
                                        new Icon('Minus', {
                                            size: 24,
                                            color: 'white',
                                        }).dom
                                    ],
                                }).dom,

                                ...[
                                    '1',
                                    '2',
                                    '3' 
                                ].map(num => new Button({
                                    className: `${styles.button} largeTitle regular`,
                                    'data-name': num,
                                    children: [ num ],
                                }).dom),

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
