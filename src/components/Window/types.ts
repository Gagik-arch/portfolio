import type { ElementPropsType } from '@nuvo-js/core/types';

export type WindowProps = Omit<ElementPropsType, 'events'> & {
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
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
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

export type TResizeAnchor = 'top' | 'left' | 'right' | 'bottom' | 'right-bottom' | 'right-top' | 'left-top' | 'left-bottom' | undefined; 
