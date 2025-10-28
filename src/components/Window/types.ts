import type { ElementPropsType } from '$lib/Element/types';

export interface WindowProps {
    width?: number;
    height?: number;
    backgroundColor?: string;
    isResizable?: boolean;
    children: ElementPropsType<HTMLDivElement>['children'];
    className?: ElementPropsType<HTMLDivElement>['className'];
    x?: number;
    y?: number;
    key?: ElementPropsType['key'];
    id?: string;
}

export interface ControlProps {
    isResizable?: boolean;
    
}

export interface WindowDimension {
    width: number;
    height: number;
    x: number;
    y: number;
    id: string;
}
