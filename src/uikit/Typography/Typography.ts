import Element from '$lib/Element';
import type {
    Size,
    TypographyProps
} from './types';
import styles from './style.module.css';
import { variants } from './data';

class Typography extends Element<HTMLDivElement> {
    public constructor({
        text,
        variant = 'body-regular',
        className = '',
        style,
        isInline = false,
    }:TypographyProps) {
        const size = variants[variant.split('-')[0] as Size];
 
        super({
            tagName: isInline ? 'span' : 'div',
            props: {
                children: [ text ],
                className: `${className} ${styles[variant.split('-')[0]]} ${styles[size[variant.split('-')[1] as keyof typeof size]]}`,
                style,
            },
        });
    }
}

export default Typography;
