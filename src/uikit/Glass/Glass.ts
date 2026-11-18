import { Element } from '@nuvo-js/core';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';
import { LiquidGlass } from '$packages/LiquidGlass';
import type { GlassProps } from './types';

class Glass extends Element<HTMLDivElement> {
    
    public constructor({
        className,    
        ...props
    }: GlassProps) { 
        super('div', {
            className: clsx(className, styles.glass, 'glass-view'),
            'data-config': JSON.stringify({
                brightness: -0.3,
                blurAmount: 0.25,
                cornerRadius: 50,
            }),
            ...props,
        });
    }

    public async Init(root: HTMLElement) {
        const instance = await LiquidGlass.init({
            root,
            glassElements: root.querySelectorAll('.glass-view'),
        });
        console.log(instance);

        // instance?.destroy();
    }
}
 
export default Glass;
