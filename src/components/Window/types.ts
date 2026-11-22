import type { ElementPropsType } from '@nuvo-js/core/types';

export type WindowProps = Omit<ElementPropsType<HTMLDivElement>, 'className'> & {
    width?: number;
    height?: number;
    backgroundColor?: string;
    isResizable?: boolean;
    x?: number;
    y?: number;
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
