import Element from '$lib/Element';
import type { InputProps } from './types';

class Input extends Element<HTMLInputElement > {
    public constructor({
        type = 'text',
        autocomplete = 'off',
        ...props
    }: InputProps) {
        super({
            tagName: 'input',
            props: {
                type,
                autocomplete,
                ...props,
            },
        });
    }
}

export default Input;
