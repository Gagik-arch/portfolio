import type { ElementPropsType } from '@nuvo-js/core/types';

export type TabsProps = Omit<ElementPropsType<HTMLSpanElement>, 'className' | 'children'> & {
    className?: string;
    tabs: (HTMLElement | string)[];
    defaultSelected?: number;
};
