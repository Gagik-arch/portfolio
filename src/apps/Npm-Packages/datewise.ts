import { Element } from '@nuvo-js/core';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';
import Typography from '$uikit/Typography';
import Button from '$uikit/Button';

export default new Element<HTMLDivElement>({
    tagName: 'div',
    props: {
        className: clsx(styles.datewise_root),
        children: [
            new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    className: clsx(styles.row),
                    children: [
                        new Typography({
                            className: clsx(styles.center, styles.title),
                            text: 'Nuvo',
                            variant: 'title1-emphasized',
                        }).dom,

                        new Button({
                            variant: 'primary',
                            children: [ 'View' ],
                            events: {
                                onclick: () => {
                                    window.open('https://www.npmjs.com/package/@nuvo-js/core?activeTab=readme', '_blank');
                                },
                            },
                        }).dom
                    ],
                },
            }).dom

        ],
    },
});
