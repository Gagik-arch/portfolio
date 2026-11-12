import type { ElementPropsType } from '@nuvo-js/core/types';

export type ScrollProps = Omit<ElementPropsType<HTMLDivElement>, 'className'> & {
    className?: string;
};
