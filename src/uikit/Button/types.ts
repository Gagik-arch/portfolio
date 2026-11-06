import type { ElementPropsType } from '@nuvo-js/core/types';

export type ButtonProps = ElementPropsType<HTMLButtonElement> & {
    variant?: 'default' | 'primary' | 'secondary';
};
