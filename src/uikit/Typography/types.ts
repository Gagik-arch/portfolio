import type { ElementPropsType } from '$lib/Element';
import type { variants } from './data';

export type Size = keyof typeof variants;

type Font = typeof variants[Size];

export type Variant = `${Size}-${keyof Font}`;

export type TooltipProps = ElementPropsType<HTMLSpanElement> & {
    text: string; 
    variant?: Variant;
};
