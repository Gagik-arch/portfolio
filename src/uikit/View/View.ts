import Element from '$lib/Element';
import type { ViewProps } from './types';

function View(props:ViewProps) {
    return (
        new Element<HTMLDivElement>({
            tagName: 'div',
            props,
        }).dom
    );
}

export default View;
