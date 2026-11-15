import { Element } from '@nuvo-js/core';
import type { InputProps } from './types';

class Input extends Element<HTMLInputElement> {
    public constructor({
        type = 'text',
        autocomplete = 'off',
        className,
        ...props
    }: InputProps) {
        super('input', {
            className: [
                'input_base',
                className
            ].join(' '),
            type,
            autocomplete,
            ...props,
        });
    }
}

export default Input;
