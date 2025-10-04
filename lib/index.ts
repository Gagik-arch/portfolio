import Element from './Element';

export const createRoot = (rootElement: HTMLElement, app: (string | HTMLElement)[] | DocumentFragment): void => {

    if (Array.isArray(app)) {
        rootElement.append(...app);
    } else {
        rootElement?.appendChild(app);
    }
};

export { Element };
