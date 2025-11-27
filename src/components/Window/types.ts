import type { ElementPropsType } from '$lib/Element/types';

export type WindowProps = ElementPropsType & {
    width?: number;
    height?: number;
    backgroundColor?: string;
    isResizable?: boolean;
    children: ElementPropsType<HTMLDivElement>['children'];
    className?: ElementPropsType<HTMLDivElement>['className'];
    x?: number;
    y?: number;
    id?: string;
    minWidth?: number;
    minHeight?: number;
};

export interface ControlProps {
    isResizable?: boolean;
    onClose?: ()=>void;
    onMinimize?: ()=>void;
    onMaximize?: ()=>void;
}

export interface WindowDimension {
    width: number;
    height: number;
    x: number;
    y: number;
    id: string;
    isResizable: WindowProps['isResizable'];
    createdAt: number;
}
