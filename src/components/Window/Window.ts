import Element from '$lib/Element';
import styles from './styles.module.css';
import type { WindowDimension, WindowProps } from './types';
import Controls from './Controls';
import {
    clampNumber, genRandomNumber, getCssVariable  
} from '$utils/index';
import desktopStore from '$store/desktop.store';
import dockStyles from '../Dock/style.module.css';
import dockIconsStore, { type IconType } from '$store/dockIcons.store';

class Window extends Element<HTMLDivElement> {
    private isMouseDowned = false;
    private resizeAnchor: 'top' | 'left' | 'right' | 'bottom' | 'right-bottom' | 'right-top' | 'left-top' | 'left-bottom' | undefined = undefined;
    private readonly borderSize = Math.round(6 * getCssVariable<number>('--scale'));
    private readonly width: number;
    private readonly height: number;
    private readonly minWidth: number;
    private readonly minHeight: number;
    private x = 0;
    private y = 0;
    public createdAt: number;

    public constructor({ 
        children,
        width,
        height,
        minWidth = 500,
        minHeight = 300,
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
                    backgroundColor: backgroundColor || 'rgba(255,255,255,0.9)',
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
            'data-is-resizable': isResizable.toString(),
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
        this.minWidth = minWidth;
        this.minHeight = minHeight;

        this.width = width ? Math.max(width, this.minWidth) : this.minWidth; 
        this.height = height ? Math.max(height, this.minHeight) : this.minHeight;
 
        const scaledWidth = this.width * getCssVariable<number>('--scale');
        const scaledHeight = this.height * getCssVariable<number>('--scale');
  
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

        if (document.activeElement !== this.dom) return;
        
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
        const target = e.target as HTMLElement;
        if (e.button !== 0 || target.closest(`.${styles.traffic_light}`)) return; 

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
        this.setProps({ 'data-resizing': 'false' });
    };

    private readonly onResize = (e: MouseEvent) => {
        const scaledWidth = this.minWidth * getCssVariable<number>('--scale');
        const scaledHeight = this.minHeight * getCssVariable<number>('--scale');
        
        const desktop = document.getElementById( 'desktop')
            ?.getBoundingClientRect();
    
        if (!this.resizeAnchor || !desktop || this.dom.dataset.resizing === 'false') return;
        
        const rect = this.dom.getBoundingClientRect();
       
        const onTop = () => {
            const height = rect.height - e.movementY;
            if (height <= scaledHeight) return; 
                
            this.y = Math.floor(Math.max((rect.top + e.movementY), desktop.top));
    
            this.dom.style.setProperty('--top', this.y + 'px');

            if ( this.y > desktop.top) {
                this.dom.style.setProperty('--height', Math.floor(Math.max(height, scaledHeight)) + 'px');
            }
        };

        const onLeft = () => {
            const width = rect.width - e.movementX;
            const left = Math.floor(Math.max(rect.left + e.movementX, 0));
                
            if (width <= scaledWidth || left === 0) return; 

            this.x = left;
            this.dom.style.setProperty('--width', Math.floor(Math.max(width, scaledWidth)) + 'px');
            this.dom.style.setProperty('--left', this.x + 'px');

            this.dom.classList.add('e-resize');
        };

        const onBottom = () => { 
            const height = Math.floor( Math.max(rect.height + e.movementY, scaledHeight));

            if (rect.bottom <= Math.round(desktop.bottom)) {
                this.dom.style.setProperty('--height', `${Math.floor(height)}px`);
            } else { 
              
                this.dom.style.setProperty('--height', `${desktop.height - rect.top + Math.floor(desktop.top)}px`);
            }
        };

        const onRight = () => {
            const width = Math.floor(Math.max(rect.width + e.movementX, scaledWidth));
                 
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

                    if (this.isMouseDowned ) {
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
        const target = desktopStore.getState().activeApps.find(item => item.window.dom.id === this.dom.id);
     
        if (!target) return; 
        const dockIcon = document.getElementById(target.name);   
       
        dockIcon?.classList.remove(dockStyles.on_open_animate);

        const app = desktopStore.getState().activeApps.find(item => item.window.dom.id === this.dom.id);
        
        if (!app) return; 

        desktopStore.removeApp(this.dom.id);
        dockIconsStore.removeIcon(app.name as IconType['title']);
    };

    public onMinimize () {
        console.info('onMinimize');
    }

    public onMaximize () {
        console.info('onMaximize');
    }
}

export default Window;
