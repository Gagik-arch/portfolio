
import Button from '$uikit/Button';
import { Element, SVGElement } from '@nuvo-js/core';
import type { GlassProps } from './types';
import './style.css';

class Glass extends Element<HTMLDivElement> {
    public constructor(props:GlassProps) {
        super({
            tagName: 'div',
            props: {
                children: [

                    new Button({
                        className: 'glassBtn',
                        children: [ 'liquid glass' ],
                    }).dom
                ],
            },
        });
    }

}

export default Glass;
