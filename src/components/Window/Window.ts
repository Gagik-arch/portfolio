import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowDimension, WindowProps } from './types';
import Controls from './Controls';
import {
    clampNumber, genRandomNumber, getCssVariable  
} from '$utils/index';
import appsStore from '$store/apps.store';

class Window extends Element<HTMLDivElement> {
    private isMouseDowned = false;
    private resizeAnchor: 'top' | 'left' | 'right' | 'bottom' | 'right-bottom' | 'right-top' | 'left-top' | 'left-bottom' | undefined = undefined;
    private readonly borderSize = 6 * getCssVariable<number>('--scale');
    private readonly width: number;
    private readonly height: number;
    private x = 0;
    private y = 0;
    public id: string;

//  TODO:  needs key implementation
    public constructor({ 
        children,
        width = 500,
        height = 300,
        backgroundColor,
        isResizable = true,
        className = '',
        x,
        y,
        key,
        id,
    }: WindowProps) {
        super({
            tagName: 'div',
            props: {
                key,
                className: `window default ${styles.root} ${className}`,
                children: [
                    Controls({ isResizable }),
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
                style: {
                    backgroundColor: backgroundColor || '#fff',
                },
                tabIndex: 0,
                'data-resizing': false,
                'data-dragging': false,
                events: {
                    onblur: () => {
                        this.dom.style.zIndex = '0';
                    },
                },
            },
        });
        this.id = id || genRandomNumber(1_000_000, 90_000_000)
            .toString();
        this.setProps({
            'data-is-resizable': isResizable,
            id: this.id,
        });
     
        this.width = width * getCssVariable<number>('--scale');
        this.height = height * getCssVariable<number>('--scale');
        this.dom.style.setProperty('--width', this.width + 'px');
        this.dom.style.setProperty('--height', this.height + 'px');
        
        const desktop = document.getElementById('desktop')
            ?.getBoundingClientRect();
        
        if (!desktop) return; 
        
        this.x = x || Math.floor(genRandomNumber(desktop.left, desktop.right - this.width));
        this.y = y || Math.floor(genRandomNumber(desktop.top, desktop.bottom - this.height));

        this.dom.style.setProperty('--left', this.x + 'px');
        this.dom.style.setProperty('--top', this.y + 'px');

        this.onMount(() => {
            window?.addEventListener('mousedown', this.onMouseDown);
            window?.addEventListener('mousemove', this.onMove);
            window?.addEventListener('mouseup', this.onMouseUp);
        });

        this.onUnMount(() => {
            window?.removeEventListener('mousedown', this.onMouseDown);
            window?.removeEventListener('mousemove', this.onMove);
            window?.removeEventListener('mouseup', this.onMouseUp);
        });
    }

    private readonly onMove = (e: MouseEvent) => {
        const desktop = this.dom.parentElement?.getBoundingClientRect();
        this.changeCursorAnchorHover(e);
        const target = e.target as HTMLElement;

        if (target !== this.dom) { 
            this.dom.classList.remove('n-resize', 'e-resize', 'grabbing');
        }
        if (!this.isMouseDowned || !desktop ) return;

        this.onResize(e);
   
        if (this.resizeAnchor) return; 
        
        const rect = this.dom.getBoundingClientRect();
        this.x = Math.round(clampNumber(rect.x + e.movementX, 0, window.innerWidth - rect.width));
        this.y = Math.round(clampNumber(rect.y + e.movementY, desktop.top, desktop.bottom - rect.height));

        this.dom.style.setProperty( '--left', this.x + 'px');
        this.dom.style.setProperty( '--top', this.y + 'px');
    };

    private readonly onMouseDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (e.button !== 0 || target !== this.dom && !target.classList.contains(styles.anchor)) return;

        this.resizeAnchor = this.detectAnchorSide(e);
        this.isMouseDowned = true;

        if (target === this.dom || (this.dom === target.closest('.' + styles.root))) { 
            
            this.setProps({ 'data-resizing': !!this.resizeAnchor + '' });
         
            this.dom.focus();
            appsStore.setFocusApp(this.dom.id);
        }

        if (this.resizeAnchor) return; 

        this.setProps({
            'data-dragging': this.isMouseDowned,
        });
    };

    private readonly onMouseUp = () => {
        this.resizeAnchor = undefined;
        this.isMouseDowned = false;

        this.dom.classList.remove('n-resize', 'e-resize', 'grabbing');
        
        this.setProps({
            'data-resizing': !!this.resizeAnchor + '',
            'data-dragging': false,
        });
    };

    private readonly onResize = (e: MouseEvent) => {
        const desktop = this.dom.parentElement?.getBoundingClientRect();
    
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
                        this.dom.classList.replace('default', 'grabbing');
                    } 
                    break;
        }
    };

    public getDimension(): WindowDimension { 
        const rect = this.dom.getBoundingClientRect(); 
  
        return {
            width: rect.width,
            height: rect.height,
            x: this.x,
            y: this.y,
            id: this.id,
        };
    }
}

export default Window;
