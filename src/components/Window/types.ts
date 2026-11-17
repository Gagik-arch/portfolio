import type { ElementPropsType } from '@nuvo-js/core/types';

export type WindowProps = Omit<ElementPropsType, 'events' | 'className'> & {
    width?: number;
    height?: number;
    backgroundColor?: string;
    isResizable?: boolean;
    children: ElementPropsType<HTMLDivElement>['children'];
    x?: number;
    y?: number;
    id?: string;
    minWidth?: number;
    minHeight?: number;
    className?: string;
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
