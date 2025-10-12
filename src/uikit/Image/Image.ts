import Element from '$lib/Element';
import type {
    ImageProps
} from './types';
import styles from './style.module.css';

class Image extends Element<HTMLImageElement> {
    public constructor({
        ...props
    }: ImageProps) {

        super({
            tagName: 'img',
            props: {
                className: styles.root,
                ...props,
            },
        });
    }
}

export default Image;
