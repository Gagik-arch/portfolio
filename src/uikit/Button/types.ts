import type { ElementPropsType } from '$lib/Element/types';

export type ButtonProps = ElementPropsType<HTMLButtonElement> & {
    variant?: 'default' | 'primary';
};
