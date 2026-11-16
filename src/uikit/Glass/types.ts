import type { ElementPropsType } from '@nuvo-js/core/types';

export type GlassProps = Omit<ElementPropsType<HTMLDivElement>, 'className'> & {
    className?: string;
};
