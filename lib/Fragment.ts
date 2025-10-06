const Fragment = (children:(HTMLElement | SVGElement | string)[]):DocumentFragment => {
    const fragment = document.createDocumentFragment();
    fragment.append(...children);

    return fragment;
};

export default Fragment;
