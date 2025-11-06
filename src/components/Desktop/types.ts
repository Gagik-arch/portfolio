import type { DesktopIconType } from '$types/index';

export type DesktopIconProps = Omit<DesktopIconType, 'index'> & {
    vx: number;
    vy: number;
};
