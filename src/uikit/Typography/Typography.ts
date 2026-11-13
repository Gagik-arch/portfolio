import { Element } from '@nuvo-js/core';
import type {
    Size,
    TypographyProps
} from './types';
import { variants } from './data';
import { clsx } from '$utils/clsx';

class Typography extends Element<HTMLDivElement> {
    public constructor({
        text,
        variant = 'body-regular',
        className,
        style,
        isInline = false,
        
    }:TypographyProps) {
        const size = variants[variant.split('-')[0] as Size];
 
        super({
            tagName: isInline ? 'span' : 'div',
            props: {
                children: [ text ],
                className: clsx(
                    className,
                    variant.split('-')[0],
                    size[variant.split('-')[1] as keyof typeof size]
                ),
                style,
            },
        });
    }
}

export default Typography;
