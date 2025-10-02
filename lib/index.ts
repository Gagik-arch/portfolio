export const createRoot = (rootElement: HTMLElement, app: HTMLElement | HTMLElement[]): void => {

    if (Array.isArray(app)) {
        rootElement.append(...app);
    } else {
        rootElement?.appendChild(app);
    }
};
