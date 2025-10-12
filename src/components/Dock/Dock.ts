import Element from '$lib/Element';
import styles from './style.module.css';
import finder from '$assets/images/app-icons/finder/finder256.png';
import trash from '$assets/images/app-icons/trash/trash256.png';
import folder from '$assets/images/app-icons/folder/folder256.png';
import settings from '$assets/images/app-icons/settings/settings256.png';
import launchpad from '$assets/images/app-icons/launchpad/launchpad256.png';
import calculator from '$assets/images/app-icons/calculator/calculator256.png';
import notes from '$assets/images/app-icons/notes/notes256.png';
import Button from '$uikit/Button';

function Dock() {

    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                events: {
                },
                className: styles.root,
                children: [
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: finder,
                                },
                            }).dom
                        ],
                    }).dom,
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: launchpad,
                                },
                            }).dom
                        ],
                    }).dom,
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: calculator,
                                },
                            }).dom
                        ],
                    }).dom,
                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: notes,
                                },
                            }).dom
                        ],
                    }).dom,

                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: settings,
                                },
                            }).dom
                        ],
                    }).dom,
                    ...Array.from({ length: 10 }, () => {
                        return (
                            new Button({
                                className: styles.button,
                                children: [
                                    new Element<HTMLImageElement>({
                                        tagName: 'img',
                                        props: {
                                            src: folder,
                                        },
                                    }).dom
                                ],
                            }).dom
                        );
                    }),

                    new Element<HTMLHRElement>({
                        tagName: 'hr',
                        props: {
                            className: styles.separator,
                            children: [],
                        },
                    }).dom,

                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: folder,
                                },
                            }).dom
                        ],
                    }).dom,

                    new Button({
                        className: styles.button,
                        children: [
                            new Element<HTMLImageElement>({
                                tagName: 'img',
                                props: {
                                    src: trash,
                                },
                            }).dom
                        ],
                    }).dom
                ],
            },
        }).dom
    );
}

export default Dock;
