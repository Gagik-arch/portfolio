import Element from '$lib/Element';
import Icons from './assets/index';
import type { IconProps } from './types';
import styles from './style.module.css';

class Icon extends Element<HTMLSpanElement> {
    public constructor(
        name: keyof typeof Icons,
        props?: IconProps
    ) {
        const size = props?.size ?? 24;

        super({
            tagName: 'span',
            props: {
                className: styles.root,
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                },
                children: [
                    Icons[name]({
                        width: size,
                        height: size,
                        ...props,
                    })
                ],
            },
        });
    }
}

export default Icon;
