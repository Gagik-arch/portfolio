type Children = (HTMLElement | SVGElement | string)[];
class Fragment { 
    public dom: DocumentFragment;
    
    public constructor(children:(HTMLElement | SVGElement | string)[]) { 
        const fragment = document.createDocumentFragment();
        fragment.append(...children);

        this.dom = fragment;
    }

    public setProps(
        {
            children,
        }: {
            children: Children;
        },
        isForceUpdate = false
    ) {
    
        if (children) {
            const newChildren = children;

            const extractedChildren = ([ ...newChildren ])?.filter(child => !!child) as ChildNode[];
       
            if (isForceUpdate) {
                this.dom?.replaceChildren(...extractedChildren);
            } else { 
                for (let i = 0; i < Math.max(extractedChildren.length, this.dom.children.length); i++) {
                    const newChild = extractedChildren[i] as HTMLElement;
                    const oldChild = this.dom.childNodes[i] as HTMLElement;
         
                    if (oldChild) {
                        if (oldChild !== newChild) {
                            oldChild.replaceWith(newChild);
                        }
                    } else { 
                        this.dom.append(newChild);
                    }
                }
            }
        }
    
        return this;
    }

    public replaceChild(index: number, newChild: null | undefined | HTMLElement | string) {
        const currentChild = this.dom.childNodes[index];

        if (currentChild === newChild) return;

        if (!newChild) {
            if (index > -1) this.dom.removeChild(currentChild);
        } else {
            if (!currentChild) {
                this.dom.append(newChild);
            } else {
                currentChild.replaceWith(newChild);
            }
        }
    }

}

export default Fragment;
