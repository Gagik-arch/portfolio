import type {
    SVGElementConstructorType, SVGTags, SVGElementPropsType
} from './types';
import { setupClassName } from '../utils';

const svgNS = 'http://www.w3.org/2000/svg';

class SVGElement <T extends SVGTags > {
    public dom: T;
    public key?: string | number | undefined = undefined;

    public constructor({
        tagName,
        props: {
            children,
            className,
            style,
            ...props
        },
        rootElement,
    }: SVGElementConstructorType) {
        this.dom = document.createElementNS(svgNS, tagName) as T;

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        this.setProps(
            {
                className,
                children,
                style,
                ...props,
            }
        );
    }

    public setProps(
        {
            className,
            children,
            style,
            ...props
        }: SVGElementConstructorType['props']
    ) {
        setupClassName(className, this.dom);

        if (children) {
            this.dom.replaceChildren(...children);
        }

        Object.entries(props)
            .forEach(([
                name,
                value
            ]) => {
                this.dom.setAttribute(name, value as string);
            });

        return this;
    }
}

export type { SVGElementPropsType };

export default SVGElement;
