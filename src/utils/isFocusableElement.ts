const focusableTags = [
    'input',
    'select',
    'textarea',
    'button',
    'a',
    'area'
];

function isFocusableElement(element: HTMLElement): boolean {
    const _element = element as HTMLButtonElement;

    if (_element.disabled || _element.hidden || _element.getAttribute('aria-hidden') === 'true') {
        return false;
    }

    const nodeName = _element.nodeName.toLowerCase();
  
    if (focusableTags.includes(nodeName) || element.closest(focusableTags.join(','))) {
        return !_element.disabled;
    }

    return false;
}

export default isFocusableElement;
