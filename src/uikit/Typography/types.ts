import type { ElementPropsType } from '@nuvo-js/core/types';
import type { variants } from './data';

export type Size = keyof typeof variants;

type Font = typeof variants[Size];

export type Variant = `${Size}-${keyof Font}`;

export type TypographyProps = Omit<ElementPropsType<HTMLSpanElement>, 'className'> & {
    text: string; 
    variant?: Variant;
    isInline?: boolean;
    className?: string;
};
