import type { ElementPropsType } from '@nuvo-js/core/types';

export type ButtonProps = Omit< ElementPropsType<HTMLButtonElement>, 'className'> & {
    variant?: 'default' | 'primary' | 'secondary';
    className?: string;
};
