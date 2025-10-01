import Element from '$lib/Element';
import type { InputProps } from './types';

class Input extends Element<HTMLInputElement> {
    public constructor({
        type = 'text',
        autocomplete = 'off',
        className,
        ...props
    }: InputProps) {
        super({
            tagName: 'input',
            props: {
                className: [
                    'input_base',
                    className
                ].join(' '),
                type,
                autocomplete,
                ...props,
            },
        });
    }
}

export default Input;
