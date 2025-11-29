import Element from '$lib/Element';
import Typography from '$uikit/Typography';
import styles from './style.module.css';
import Image from '$uikit/Image';
import exclamationMark from '$assets/images/exclamation-mark.png';

function NotSupportedDevice() { 
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ 
                    new Element<HTMLDivElement>({
                        tagName: 'div',
                        props: {
                            className: styles.block,
                            children: [
                                new Image({
                                    src: exclamationMark,
                                    width: 70,
                                    height: 70,
                                }).dom,

                                new Typography({
                                    variant: 'title3-emphasized',
                                    text: 'Device not supported',
                                }).dom,

                                new Typography({
                                    variant: 'callout-regular',
                                    style: {
                                        marginTop: '10px',
                                    },
                                    text: 'Please use a desktop browser to continue.',
                                }).dom
                            ],
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default NotSupportedDevice;

