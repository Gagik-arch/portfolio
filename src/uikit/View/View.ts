import Element from '$lib/Element';
import type { ViewProps } from './types';

class View extends Element<HTMLDivElement> {
    public constructor(props:ViewProps) {
        super({
            tagName: 'div',
            props,
        });
    }
}

export default View;
