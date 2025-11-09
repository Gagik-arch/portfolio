import type { DesktopIconType } from '$types/index';

export type DesktopIconProps = DesktopIconType & {
    onDoubleClick?: (e:MouseEvent)=>void;
}; 
