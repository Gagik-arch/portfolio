import Element from '$lib/Element';
import type { InputProps } from './types';

function Input({
    type = 'text',
    autocomplete = 'off',
    ...props
}: InputProps ) {
    return (
        new Element<HTMLInputElement>({
            tagName: 'input',
            props: {
                type,
                autocomplete,
                ...props,
            },
        }).dom
    );
}

export default Input;
