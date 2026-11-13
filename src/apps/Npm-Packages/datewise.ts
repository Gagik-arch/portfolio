import { Element } from '@nuvo-js/core';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';
import Typography from '$uikit/Typography';
import Button from '$uikit/Button';
import Image from '$uikit/Image';
import logo from '$assets/images/app-icons/datewise.avif';
import Link from '$uikit/Link';

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

                        new Element<HTMLDivElement>({
                            tagName: 'div',
                            props: {
                                style: {
                                    display: 'flex',
                                    flex: '1',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                },
                                children: [
                                    new Image({
                                        src: logo,
                                        style: {
                                            width: '30px', height: '30px',
                                        },
                                    }).dom,

                                    new Typography({
                                        className: clsx(styles.center),
                                        text: 'Datewise',
                                        variant: 'title2-emphasized',
                                        isInline: true,
                                    }).dom
                                ],
                            },
                        }).dom,

                        new Link({
                            href: 'https://www.npmjs.com/package/datewise',
                            target: '_blank',
                            children: [
                                new Button({
                                    children: [ 'View npm' ],
                                    variant: 'primary',
                           
                                }).dom
                            ],
                        }).dom
                    ],
                },
            }).dom,
        
            new Typography({
                text: 'Datewise ',
                isInline: true,
                variant: 'body-emphasized',
     
            }).dom,

            new Typography({
                isInline: true,
                text: ' is a lightweight, TypeScript-first calendar utility for JavaScript applications.',
                variant: 'body-regular',
            }).dom,

            new Typography({
                text: 'Datewise is a lightweight calendar utility that provides date navigation, calendar generation, and locale-aware month and weekday names.',
                variant: 'body-regular',
                style: {
                    marginTop: '10px',
                },
            }).dom,

            new Typography({
                text: 'It generates a consistent 6-week calendar grid (42 days), including dates from adjacent months, making it easy to build custom calendar interfaces.',
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
                                        text: '42-day calendar grid ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Always generates 6 weeks.',
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
                                        text: 'Date navigation ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Navigate between months and years.',
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
                                        text: 'Locale support ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Generate localized month and weekday names using the native JavaScript Intl API.',
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
                                        text: 'Month classification ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Identify previous-month, current-month, and next-month dates.',
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
                                        text: 'Date validation ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Validates date inputs before updating calendar state.',
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
                                        text: '- Written in TypeScript with type definitions.',
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
                                        text: 'Zero runtime dependencies ',
                                        variant: 'body-emphasized',
                                        isInline: true,
                                    }).dom,

                                    new Typography({
                                        text: '- Uses native JavaScript date and internationalization APIs.',
                                        isInline: true,
                                        variant: 'body-regular',
                                    }).dom
                                ],
                            },
                        }).dom
                   
                    ],
                },
            }).dom,
            
            new Link({
                href: 'https://datewise-khaki.vercel.app',
                target: '_blank',
                style: {
                    marginTop: '20px',
                    marginLeft: '4px',
                },
                children: [
                    new Button({
                        children: [ 'View demo' ],
                        variant: 'primary',
                           
                    }).dom
                ],
            }).dom
        ],
    },
});
