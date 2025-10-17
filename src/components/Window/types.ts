import type { ElementPropsType } from '$lib/Element/types';

export interface WindowProps {
    width?: number;
    height?: number;
    backgroundColor?: string;
    isResizable?: boolean;
    children: ElementPropsType<HTMLDivElement>['children'];
    className?: ElementPropsType<HTMLDivElement>['className'];
}
