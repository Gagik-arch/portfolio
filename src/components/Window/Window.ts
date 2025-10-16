import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowProps } from './types';
import Controls from './Controls';
import { clampNumber, getCssVariable } from '$utils/index';

class Window extends Element<HTMLDivElement> {
    private isMouseDowned = false;
    private resizeAnchor: 'top' | 'left' | 'right' | 'bottom' | undefined = undefined;
    private readonly borderSize = 6 * getCssVariable<number>();
    private readonly width: number;
    private readonly height: number;

    public constructor(props?: WindowProps) {
        super({
            tagName: 'div',
            props: {
                className: styles.root,
                children: [ Controls() ],
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

        if (!this.isMouseDowned || !desktop ) return;

        const rect = this.dom.getBoundingClientRect();

        this.dom.style.left = (clampNumber(rect.x + e.movementX, 0, window.innerWidth - rect.width)) + 'px';

        this.dom.style.top = (clampNumber(rect.y + e.movementY, desktop.top, desktop.bottom - rect.height)) + 'px';
    };

    private readonly onMouseDown = (e: MouseEvent) => {
        if (e.target !== this.dom ) return;

        this.resizeAnchor = this.detectAnchorSide(e);

        if (this.resizeAnchor) return; 

        this.isMouseDowned = true;
    };

    private readonly onMouseUp = () => {
        this.isMouseDowned = false;
        this.resizeAnchor = undefined;
        this.dom.className = styles.root;

    };
    
    private readonly onResize = (e: MouseEvent) => {
        this.changeCursorAnchorHover(e);

        if (!this.resizeAnchor) return;
  
        const rect = this.dom.getBoundingClientRect();
 
        switch (this.resizeAnchor) {
                case 'top':
                    if (rect.height < this.height ) {
                        this.dom.style.height = this.height + 'px';
                        return;
                    }
                    const height = rect.height - e.movementY;
                    if (height <= this.height) return; 
                
                    this.dom.style.top = (rect.top + e.movementY) + 'px';
                    this.dom.style.height = height + 'px';
                    break;
      
                case 'bottom':
                    if (rect.height < this.height ) {
                        this.dom.style.height = this.height + 'px';
                        return;
                    }
                    this.dom.style.height = (rect.height + e.movementY) + 'px';
                    break;
                case 'left':
                    if (rect.width < this.width ) {
                        this.dom.style.width = this.width + 'px';
                        return;
                    }
                    const width = rect.width - e.movementX;
                    if (width <= this.width) return; 
                
                    this.dom.style.width = width + 'px';
                    this.dom.style.left = (rect.left + e.movementX) + 'px';
                    break;
                case 'right':
                    if (rect.width < this.width ) {
                        this.dom.style.width = this.width + 'px';
                        return;
                    }
                  
                    this.dom.style.width = (rect.width + e.movementX) + 'px';
                    break;
                default:
                    break;
        }
    };

    private readonly detectAnchorSide = (e: MouseEvent) => {
        const rect = this.dom.getBoundingClientRect();
        
        if (e.offsetX < this.borderSize) {
            return 'left';
        }
        if (e.offsetX > rect.width - this.borderSize) {
            return 'right';
        }
        if (e.offsetY < this.borderSize) {
            return 'top';
        }
        if (e.offsetY > rect.height - this.borderSize) {
            return 'bottom';
        }
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
                    this.dom.className = styles.root;
                    break;
        }

    };
}
export default Window;
