import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowProps } from './types';
import Controls from './Controls';
import { clampNumber, getCssVariable } from '$utils/index';

class Window extends Element<HTMLDivElement> {
    private isMouseDowned = false;
    private resizeAnchor: 'top' | 'left' | 'right' | 'bottom' | 'right-bottom' | 'right-top' | 'left-top' | 'left-bottom' | undefined = undefined;
    private readonly borderSize = 6 * getCssVariable<number>();
    private readonly width: number;
    private readonly height: number;

    public constructor(props?: WindowProps) {
        super({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [
                    Controls(),
                    new Element<HTMLSpanElement>({
                        tagName: 'span',
                        props: {
                            className: `${styles.left_top} nw-resize ${styles.anchor}`,
                            children: [],
                        },
                    }).dom,
                    new Element<HTMLSpanElement>({
                        tagName: 'span',
                        props: {
                            className: `${styles.left_bottom} ne-resize ${styles.anchor}`,
                            children: [],
                        },
                    }).dom,
                    new Element<HTMLSpanElement>({
                        tagName: 'span',
                        props: {
                            className: `${styles.right_top} ne-resize ${styles.anchor}`,
                            children: [],
                        },
                    }).dom,
                    new Element<HTMLSpanElement>({
                        tagName: 'span',
                        props: {
                            className: `${styles.right_bottom} nw-resize ${styles.anchor}`,
                            children: [],
                        },
                    }).dom
                ],
                style: {
                    width: `calc(${props?.width || 500}px * var(--scale))`,
                    height: `calc(${props?.height || 300}px * var(--scale))`,
                    backgroundColor: props?.backgroundColor || '#fff',
                },
            },
        });
        
        this.width = (props?.width || 500) * getCssVariable<number>();
        this.height = props?.height || 300 * getCssVariable<number>();
        const isResizable = props?.isResizable || true;

        this.onMount(() => {
            if (!isResizable) return;
            window?.addEventListener('mousedown', this.onMouseDown);
            window?.addEventListener('mousemove', this.onMove);
            window?.addEventListener('mouseup', this.onMouseUp);

        });

        this.onUnMount(() => {
            if (!isResizable) return;
            window?.removeEventListener('mousedown', this.onMouseDown);
            window?.removeEventListener('mousemove', this.onMove);
            window?.removeEventListener('mouseup', this.onMouseUp);
        });
    }

    private readonly onMove = (e: MouseEvent) => {
        const desktop = this.dom.parentElement?.getBoundingClientRect();

        this.onResize(e);
        
        if (this.dom !== e.target) { 
            this.dom.className = `window ${styles.root}`;
        }
    
        if (!this.isMouseDowned || !desktop ) return;
   
        const rect = this.dom.getBoundingClientRect();

        this.dom.style.left = (clampNumber(rect.x + e.movementX, 0, window.innerWidth - rect.width)) + 'px';
        this.dom.style.top = (clampNumber(rect.y + e.movementY, desktop.top, desktop.bottom - rect.height)) + 'px';
    };

    private readonly onMouseDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target !== this.dom && !target.classList.contains(styles.anchor)) return;
        this.dom.focus();
        
        this.resizeAnchor = this.detectAnchorSide(e);
     
        this.setProps({
            'data-resizing': !!this.resizeAnchor + '',
        });

        if (this.resizeAnchor) return; 
      
        this.isMouseDowned = true;
    };

    private readonly onMouseUp = () => {
        this.isMouseDowned = false;
        this.resizeAnchor = undefined;
        this.dom.className = `window default ${styles.root}`;

        this.setProps({
            'data-resizing': !!this.resizeAnchor + '',
        });
    };
    
    private readonly onResize = (e: MouseEvent) => {
        this.changeCursorAnchorHover(e);
        
        const desktop = this.dom.parentElement?.getBoundingClientRect();
     
        if (!this.resizeAnchor || !desktop) return;
        
        const rect = this.dom.getBoundingClientRect();
       
        const onTop = () => {
            const height = rect.height - e.movementY;
            if (height <= this.height) return; 
                
            const top = Math.floor(Math.max((rect.top + e.movementY), desktop.top));
            this.dom.style.top = top + 'px';
                
            if (top > desktop.top) {
                this.dom.style.height = Math.floor(Math.max(height, this.height)) + 'px';
            }
        };

        const onLeft = () => {
            const width = rect.width - e.movementX;
            const left = Math.floor(Math.max(rect.left + e.movementX, 0));
                
            if (width <= this.width || left === 0) return; 
            
            this.dom.style.width = Math.floor(Math.max( width, this.width)) + 'px';
            this.dom.style.left = left + 'px';
        };

        const onBottom = () => { 
            const height = Math.max(rect.height + e.movementY, this.height);
            this.dom.style.height = `${Math.floor(rect.bottom < desktop.bottom ? height : desktop.height - rect.top + desktop.top )}px`;
                  
        };

        const onRight = () => {
            const width = Math.floor(Math.max(rect.width + e.movementX, this.width));
                 
            this.dom.style.width = `${rect.right <= desktop.right ? width : desktop.width - rect.left}px`;
        };
    
        switch (this.resizeAnchor) {
                case 'top':
                    onTop();
                    break;
                case 'bottom':
                    onBottom();
                    break;
                case 'left':
                    onLeft();
                    break;
                case 'right':
                    onRight();
                    break;
                case 'left-top':
                    onLeft();
                    onTop();
                    break;
                case 'left-bottom':
                    onLeft();
                    onBottom();
                    break;
                case 'right-top':
                    onRight();
                    onTop();
                    break;
                case 'right-bottom':
                    onRight();
                    onBottom();
                    break;
                default:
                    break;
        }
    };

    private readonly detectAnchorSide = (e: MouseEvent) => {
        const rect = this.dom.getBoundingClientRect();
   
        const target = e.target as HTMLElement;
    
        if ( target.classList.contains(styles.right_bottom)) return 'right-bottom';
        if ( target.classList.contains(styles.right_top)) return 'right-top';
        if ( target.classList.contains(styles.left_top)) return 'left-top';
        if ( target.classList.contains(styles.left_bottom)) return 'left-bottom';

        if (e.offsetX < this.borderSize) return 'left';
        
        if (e.offsetX > rect.width - this.borderSize) return 'right';
        
        if (e.offsetY < this.borderSize) return 'top';
        
        if (e.offsetY > rect.height - this.borderSize) return 'bottom';
        
        return undefined;
    };

    private readonly changeCursorAnchorHover = (e:MouseEvent) => {
        const anchor = this.detectAnchorSide(e);

        switch (anchor) {
                case 'right':
                case 'left':
                    this.dom.classList.add('e-resize');
                    break;
                case 'top':
                case 'bottom':
                    this.dom.classList.add('n-resize');
                    break;
                default:
                    this.dom.className = `${styles.root} ${this.isMouseDowned ? 'grabbing' : 'default'}  window`;
                    break;
        }

    };
}

export default Window;
