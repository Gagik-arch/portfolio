import { Element } from '@nuvo-js/core';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';
import Typography from '$uikit/Typography';
import Button from '$uikit/Button';

export default new Element<HTMLDivElement>({
    tagName: 'div',
    props: {
        className: clsx(styles.nuvo_root),
        children: [ 
            new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    className: clsx(styles.row),
                    children: [
                        new Element<HTMLDivElement>({
                            tagName: 'div',
                            props: {},
                        }).dom,
                        
                        new Typography({
                            className: clsx(styles.center, styles.title),
                            text: 'Nuvo',
                            variant: 'title2-emphasized',
                        }).dom,

                        new Button({
                            children: [ 'View npm' ],
                            variant: 'primary',
                              
                            events: {
                                onclick: () => {
                                    window.open('https://www.npmjs.com/package/@nuvo-js/core', '_blank');
                                },
                            },
                        }).dom
                    ],
                },
            }).dom,
        
            new Typography({
                text: 'Nuvo ',
                isInline: true,
                variant: 'body-emphasized',
     
            }).dom,

            new Typography({
                isInline: true,
                text: ' is a lightweight, TypeScript-first UI library built around native DOM APIs.',
                variant: 'body-regular',
               
            }).dom,

            new Typography({
                text: 'Nuvo provides a class-based approach to building web interfaces without JSX or unnecessary rendering abstractions. It gives developers direct control over HTML and SVG elements while providing reactive state management and efficient DOM updates through keyed and unkeyed diffing.',
                variant: 'body-regular',
                style: {
                    marginTop: '10px',
                },
            }).dom,

            new Element<HTMLUListElement>({
                tagName: 'ul',
                props: {
                    children: [
                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'DOM-first architecture ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Direct interaction with native DOM elements.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'TypeScript support ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Generic types and public type definitions.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'HTML elements ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Create and configure native HTML elements.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'SVG elements ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Build SVG graphics using the same architecture.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'Reactive Store ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Manage application state with subscriptions and effects.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'DOM Diffing ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Efficiently update existing DOM elements.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'Keyed Diffing ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Reuse, insert, remove, and reorder elements using unique keys.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'No Virtual DOM ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Work directly with real DOM elements.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'No JSX required ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Build interfaces using standard JavaScript and TypeScript.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Element<HTMLLIElement>({
                            tagName: 'li',
                            props: {
                                children: [
                                    new Typography({
                                        className: styles.center,
                                        text: 'Lightweight  ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Built around native browser APIs.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom
                    ],
                },
            }).dom,

            new Button({
                children: [ 'View demo' ],
                variant: 'secondary',
                style: {
                    marginTop: '20px',
                    marginLeft: '4px',
                },
                events: {
                    onclick: () => {
                        window.open('https://example-ten-opal.vercel.app/', '_blank');
                    },
                },
            }).dom
        ],
    },
});
