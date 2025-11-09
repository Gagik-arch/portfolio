import type allApps from '$apps/index';

export interface DesktopIconType {
    x?: number;
    y?: number;
    title: keyof typeof allApps;
    appIcon: string;
    index: number;
}
