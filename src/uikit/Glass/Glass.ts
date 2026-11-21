import { Element } from '@nuvo-js/core';
import styles from './style.module.css';
import { clsx } from '$utils/clsx';
import type { GlassProps } from './types';

class Glass extends Element<HTMLDivElement> {
    public constructor(props?: GlassProps) { 
        const {
            className,
            squircle = 'squircle_16',
            ..._props
        } = props ?? {};

        super('div', {
            className: clsx(className, styles.root, squircle),
            ..._props,
        });
    }
}
 
export default Glass;
