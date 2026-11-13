import type { ElementPropsType } from '@nuvo-js/core/types';

export type LinkProps = Omit<ElementPropsType<HTMLAnchorElement>, 'className'> & {
    className?: string;
};
