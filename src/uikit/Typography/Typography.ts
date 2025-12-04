import Element from '$lib/Element';
import type {
    Size,
    TypographyProps
} from './types';
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
                className: `${className} ${variant.split('-')[0]} ${size[variant.split('-')[1] as keyof typeof size]}`,
                style,
            },
        });
    }
}

export default Typography;
