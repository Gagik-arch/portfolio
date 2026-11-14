function isFocusableElement(element:HTMLElement) :boolean {
    const _element = element as HTMLButtonElement;

    if (_element.disabled || _element.hidden || _element.getAttribute('aria-hidden') === 'true') {
        return false;
    }

    const nodeName = _element.nodeName.toLowerCase();
  
    if ([
        'input',
        'select',
        'textarea',
        'button' 
    ].includes(nodeName)
    || element.closest('input,select,textarea,button')
    ) {
        return !_element.disabled;
    }
  
    if (nodeName === 'a' || nodeName === 'area') {
        return element.hasAttribute('href');
    }

    const tabIndexAttr = _element.getAttribute('tabindex');
    if (tabIndexAttr !== null) {
        return parseInt(tabIndexAttr, 10) >= 0;
    }

    return false;
}

export default isFocusableElement;
