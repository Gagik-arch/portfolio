 
import Vector from '$utils/trigonometry/Vector';
import { clampNumber } from '$utils/index';

const iconSize = 100;

export const convertRealToVirtual = (mouse: Vector, rootRect: DOMRect) => { 

    const mouseMax = new Vector(clampNumber(mouse.x, 0, window.innerWidth),
        clampNumber(mouse.y, 0, window.innerHeight));
    
    const cord = mouseMax.subtract(new Vector(rootRect.x, rootRect.y))
        .subtract(new Vector(rootRect.width, 0))
        .divide(100)
        .abs()
        .floor();
    
    const maxWidthBlock = Math.floor(rootRect.width / iconSize) - 1;
    const maxHeightBlock = Math.floor(rootRect.height / iconSize) - 1;

    return new Vector(
        clampNumber(cord.x, 0, maxWidthBlock),
        clampNumber(cord.y, 0, maxHeightBlock)
    );
};

export const convertVirtualToReal = (virtual: Vector, rootRect:DOMRect) => { 
    return virtual.multiply(100)
        .subtract(new Vector(rootRect.width - iconSize, 0))
        .floor()
        .abs();
};

export const convertVirtualToIndex = (virtual: Vector, rootRect: DOMRect) => { 
    const heightBlocks = Math.floor(rootRect.height / 100);
    return heightBlocks * virtual.x + virtual.y;
}; 

export const convertIndexTOVirtual = (index: number, rootRect: DOMRect) => { 
    const heightBlocks = Math.floor(rootRect.height / 100);
    
    return new Vector(
        Math.floor(index / heightBlocks),
        index % heightBlocks
    );
}; 
