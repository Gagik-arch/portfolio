 
import Vector from '$utils/trigonometry/Vector';
import { clamp } from '$utils/index';
import type { DesktopIconType } from '$types/index';

const iconSize = 100;

export const convertRealToVirtual = (mouse: Vector, rootRect: DOMRect) => { 

    const mouseMax = new Vector(clamp(mouse.x, 0, window.innerWidth),
        clamp(mouse.y, 0, window.innerHeight));
    
    const cord = mouseMax.Subtract(new Vector(rootRect.x, rootRect.y))
        .Subtract(new Vector(Math.floor(rootRect.width), 0))
        .Divide(100)
        .ToABS()
        .Floor();
    
    const maxWidthBlock = Math.floor(rootRect.width / iconSize) - 1;
    const maxHeightBlock = Math.floor(rootRect.height / iconSize) - 1;

    return new Vector(
        clamp(cord.x, 0, maxWidthBlock),
        clamp(cord.y, 0, maxHeightBlock)
    );
};

export const convertVirtualToReal = (virtual: Vector, rootRect: DOMRect) => { 
    return virtual.Multiply(100)
        .Subtract(new Vector(Math.floor(rootRect.width) - iconSize, 0))
        .ToABS();
};

export const convertVirtualToIndex = (virtual: Vector, rootRect: DOMRect) => { 
    const heightBlocks = Math.floor(rootRect.height / 100);
    return heightBlocks * virtual.x + virtual.y;
}; 

export const convertIndexToVirtual = (index: number, rootRect: DOMRect) => { 
    const heightBlocks = Math.floor(Math.floor(rootRect.height) / 100);

    return new Vector(
        index / heightBlocks,
        index % heightBlocks
    )
        .Floor();
}; 

export const extractRangeFromIconToIcon = (
    startIndex: number,
    appsIcons: (DesktopIconType | null)[]
): DesktopIconType[] => {
    const result: DesktopIconType[] = [];

    for (let i = startIndex; i < appsIcons.length; i++) {
        const item = appsIcons[i];

        if ( item === null) break;
        
        result.push(item);
    }

    return result;
};
