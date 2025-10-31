 
import Vector from '$utils/trigonometry/Vector';

export const convertRealToVirtual = (mouse: Vector, rect:DOMRect) => { 
    return mouse.subtract(new Vector(rect.x, rect.y))
        .subtract(new Vector(rect.width, 0))
        .floor()
        .divide(100)
        .abs()
        .floor();
};

export const convertVirtualToReal = (virtual: Vector, rect:DOMRect) => { 
   
    return virtual.multiply(100)
        .subtract(new Vector(rect.width - 100, 0))
        .floor()
        .abs();
};
