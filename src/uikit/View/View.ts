import { Element } from '$lib/index';
import type { ViewProps } from './types';

class View extends Element<HTMLDivElement> {
    public constructor(props:ViewProps) {
        super({
            tagName: 'div',
            props: {
                ...props,
            },
        });
    }
}

export default View;
