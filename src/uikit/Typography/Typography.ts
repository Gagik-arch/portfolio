import Element from '$lib/Element';
import type {
    Size,
    TooltipProps
} from './types';
import styles from './style.module.css';
import { variants } from './data';

class Typography extends Element<HTMLSpanElement> {
    public constructor({
        text,
        variant = 'body-regular',
        className,
    }:TooltipProps) {
        const size = variants[variant.split('-')[0] as Size];

        super({
            tagName: 'span',
            props: {
                children: [ text ],
                className: `${className} ${styles[variant.split('-')[0]]} ${styles[size[variant.split('-')[1] as keyof typeof size]]}`,
            },
        });
    }
}

export default Typography;
