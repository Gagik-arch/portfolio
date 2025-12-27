import type allApps from '$apps/index';
import type { AppData } from '$components/App/types';
import type { WindowDimension } from '$components/Window/types';

export interface DesktopIconType {
    x?: number;
    y?: number;
    title: keyof typeof allApps;
    appIcon: string;
    index: number;
}

export type ActiveAppType = WindowDimension & AppData;

export interface DocumentType {
    key: string;
    label: string;
}

export interface ResponseErrorType {
    key: string;
    code: string;
}

export interface ResponseSuccessType<T> {
    errors: ResponseErrorType[] | null;
    success: boolean;
    data: T;
}
