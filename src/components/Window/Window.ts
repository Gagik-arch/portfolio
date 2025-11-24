import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowDimension, WindowProps } from './types';
import Controls from './Controls';
import {
    clampNumber, genRandomNumber, getCssVariable  
} from '$utils/index';
import desktopStore from '$store/desktop.store';

class Window extends Element<HTMLDivElement> {
    private isMouseDowned = false;
    private resizeAnchor: 'top' | 'left' | 'right' | 'bottom' | 'right-bottom' | 'right-top' | 'left-top' | 'left-bottom' | undefined = undefined;
    private readonly borderSize = Math.round(6 * getCssVariable<number>('--scale'));
    private readonly width: number;
    private readonly height: number;
    private x = 0;
    private y = 0;
    public createdAt: number;

    public constructor({ 
        children,
        width = 500,
        height = 300,
        backgroundColor,
        isResizable = true,
        className = '',
        x,
        y,
        id,
        events,
        ...props
    }: WindowProps) {
        super({
            tagName: 'div',
            props: {
                className: `window default ${styles.root} ${className}`,
                style: {
                    backgroundColor: backgroundColor || '#fff',
                },
                tabIndex: 0,
                events: {
                    onblur: () => {
                        this.dom.style.zIndex = '0';
                    },
                    ...events,
                },
                ...props,
            },
        });
        this.createdAt = new Date()
            .getTime();
        
        this.setProps({
            'data-is-resizable': isResizable,
            id: id || genRandomNumber(1_000_000, 90_000_000)
                .toString(),
            children: [
                Controls({
                    isResizable,
                    onClose: this.onClose,
                    onMinimize: this.onMinimize,
                    onMaximize: this.onMaximize,
                }),
                ...(isResizable
                    ? [
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
                    ]
                    : []),
                ...(children ?? [])
            ],
        });
  
        this.width = width;
        this.height = height;
        const scaledWidth = width * getCssVariable<number>('--scale');
        const scaledHeight = height * getCssVariable<number>('--scale');
  
        this.dom.style.setProperty('--width', scaledWidth + 'px');
        this.dom.style.setProperty('--height', scaledHeight + 'px');
        
        const desktop = document.getElementById('desktop'); 
        const desktopRect = desktop?.getBoundingClientRect();
        
        if (!desktopRect) return; 
        
        this.x = x ?? Math.floor(genRandomNumber(desktopRect.left, desktopRect.right - scaledWidth));
        this.y = y ?? Math.floor(genRandomNumber(desktopRect.top, desktopRect.bottom - scaledHeight));

        this.dom.style.setProperty('--left', this.x + 'px');
        this.dom.style.setProperty('--top', this.y + 'px');

        this.onMount(() => {
            desktop?.addEventListener('mousedown', this.onMouseDown);
            window.addEventListener('mousemove', this.onMove);
            window.addEventListener('mouseup', this.onMouseUp);
        });

        this.onUnMount(() => {
            desktop?.removeEventListener('mousedown', this.onMouseDown);
            window.removeEventListener('mousemove', this.onMove);
            window.removeEventListener('mouseup', this.onMouseUp);
        });
    }

    private readonly onMove = (e: MouseEvent) => {
        const desktop = document.getElementById( 'desktop')
            ?.getBoundingClientRect();

        this.changeCursorAnchorHover(e);
        const target = e.target as HTMLElement;

        if (target !== this.dom) { 
            this.dom.classList.remove('n-resize', 'e-resize', 'grabbing');
        }
     
        if (!this.isMouseDowned || !desktop) return;

        this.onResize(e);
   
        if (this.resizeAnchor) return; 
        
        const rect = this.dom.getBoundingClientRect();
        this.x = Math.round(clampNumber(rect.x + e.movementX, 0, window.innerWidth - rect.width));
        this.y = Math.round(clampNumber(rect.y + e.movementY, desktop.top, desktop.bottom - rect.height));

        this.dom.style.setProperty( '--left', this.x + 'px');
        this.dom.style.setProperty( '--top', this.y + 'px');
    };

    private readonly onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; 

        const target = e.target as HTMLElement;
        if ( target === e.currentTarget ) { 

            desktopStore.setFocusApp(undefined);
            return;
        }

        this.resizeAnchor = this.detectAnchorSide(e);
        this.isMouseDowned = this.dom === target.closest('.' + styles.root);
    
        if (this.isMouseDowned) {
            this.setProps({ 'data-resizing': !!this.resizeAnchor + '' });
         
            this.dom.focus();

            desktopStore.setFocusApp(this.dom.id);
        }

        if (this.resizeAnchor) return; 
    };

    private readonly onMouseUp = () => {
        this.resizeAnchor = undefined;
        this.isMouseDowned = false;

        this.dom.classList.remove('n-resize', 'e-resize', 'grabbing');
    };

    private readonly onResize = (e: MouseEvent) => {
        const desktop = document.getElementById( 'desktop')
            ?.getBoundingClientRect();
    
        if (!this.resizeAnchor || !desktop || this.dom.dataset.resizing === 'false') return;
        
        const rect = this.dom.getBoundingClientRect();
       
        const onTop = () => {
            const height = rect.height - e.movementY;
            if (height <= this.height) return; 
                
            this.y = Math.floor(Math.max((rect.top + e.movementY), desktop.top));
    
            this.dom.style.setProperty('--top', this.y + 'px');

            if ( this.y > desktop.top) {
                this.dom.style.setProperty('--height', Math.floor(Math.max(height, this.height)) + 'px');
            }
        };

        const onLeft = () => {
            const width = rect.width - e.movementX;
            const left = Math.floor(Math.max(rect.left + e.movementX, 0));
                
            if (width <= this.width || left === 0) return; 
            this.x = left;
            this.dom.style.setProperty('--width', Math.floor(Math.max(width, this.width)) + 'px');
            this.dom.style.setProperty('--left', this.x + 'px');
        };

        const onBottom = () => { 
            const height = Math.max(rect.height + e.movementY, this.height);

            this.dom.style.setProperty('--height', `${Math.floor(rect.bottom < desktop.bottom ? height : desktop.height - rect.top + desktop.top )}px`);
        };

        const onRight = () => {
            const width = Math.floor(Math.max(rect.width + e.movementX, this.width));
                 
            this.dom.style.setProperty('--width', `${rect.right <= desktop.right ? width : desktop.width - rect.left}px`);
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
        if (target.dataset.isResizable === 'false') return undefined; 
        
        if ( target.classList.contains(styles.right_bottom)) return 'right-bottom';
        if ( target.classList.contains(styles.right_top)) return 'right-top';
        if ( target.classList.contains(styles.left_top)) return 'left-top';
        if ( target.classList.contains(styles.left_bottom)) return 'left-bottom';

        if (!target.classList.contains(styles.root)) return undefined;

        if (e.offsetX < this.borderSize) return 'left';
        
        if (e.offsetX > rect.width - this.borderSize) return 'right';
        
        if (e.offsetY < this.borderSize) return 'top';
        
        if (e.offsetY > rect.height - this.borderSize) return 'bottom';
        
        return undefined;
    };

    private readonly changeCursorAnchorHover = (e:MouseEvent) => {
        const anchor = this.detectAnchorSide(e);

        const target = e.target as HTMLElement;

        if (target !== this.dom) return; 

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
                    this.dom.classList.remove('n-resize');
                    this.dom.classList.remove('e-resize');

                    if (this.isMouseDowned) {
                        this.dom.classList.add('grabbing');
                    }
                    break;
        }
    };

    public getDimension(): WindowDimension { 
        return {
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            id: this.dom.id,
            isResizable: !!this.dom.dataset.isResizable,
            createdAt: this.createdAt,
        };
    }

    public onClose = () => {

        //  FIX: desktopStore.removeApp(this.dom.id);
    };

    public onMinimize () {
        console.info('onMinimize');
    }

    public onMaximize () {
        console.info('onMaximize');
    }
}

export default Window;
