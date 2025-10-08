import Element from '$lib/Element';
import styles from './style.module.css';
import finder from '$assets/images/app-icons/finder/finder256.png';
import trash from '$assets/images/app-icons/trash/trash256.png';
import folder from '$assets/images/app-icons/folder/folder256.png';
import settings from '$assets/images/app-icons/settings/settings256.png';
import launchpad from '$assets/images/app-icons/launchpad/lanchpad256.png';
import calculator from '$assets/images/app-icons/calculator/calculator256.png';
import notes from '$assets/images/app-icons/notes/notes256.png';
import Button from '$uikit/Button';
import Squircle from '$lib/Squircle';

function Dock() {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
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
                    }).dom,
                    Squircle({
                        className: styles.backdrop,
                    })
                ],
            },
        }).dom
    );
}

export default Dock;
