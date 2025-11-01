import Element from '$lib/Element';
import styles from './style.module.css';
import appsStore from '$store/apps.store';
import Vector from '$utils/trigonometry/Vector';
import desktopIconStore from '$store/desktop-icons.store';
import DesktopIcon from './DesktopIcon';
import { convertRealToVirtual, convertVirtualToReal } from './utils';
import type { DesktopIconType } from '$types/index';
import { clampNumber } from '$utils/index';

function Desktop() {
    let appIcon:DesktopIconType | null = null, 
            timeout: number | undefined = undefined;

    const windowContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            className: styles.window_container,
        },
    });
   
    const iconContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'icon_container',
            className: styles.icon_container,
            events: {
                onmousedown: (e) => {
                    clearTimeout(timeout);

                    const target = (e.target as HTMLElement).closest('.' + styles.app_icon) as HTMLButtonElement;
                    if (target) {
                        const x = +(target.dataset.vx || 0);
                        const y = +(target.dataset.vy || 0);

                        target.classList.remove(styles.transition);

                        const app:DesktopIconType | undefined = desktopIconStore.getState()
                            .find(a => a.x === x && a.y === y);
         
                        if (!app) return; 
                        
                        appIcon = app;
                        
                    }
                },
            },
        },
    })
        .onMount((e) => {
            e.setProps({
                children: desktopIconStore.getState()
                    .map(item => {
                        const real = convertVirtualToReal(
                            new Vector(item.x, item.y),
                            e.dom.getBoundingClientRect()
                        );
                        return DesktopIcon({
                            x: real.x,
                            y: real.y,
                            vx: item.x,
                            vy: item.y,
                            title: item.title,
                            appIcon: item.appIcon,
                        });
                    }),
            });
            
        });
    
    desktopIconStore.subscribe((icons) => {
        iconContainer.setProps({
            children: icons.map(item => {
                const real = convertVirtualToReal(
                    new Vector(item.x, item.y),
                    iconContainer.dom.getBoundingClientRect()
                );

                return DesktopIcon({
                    x: real.x,
                    y: real.y,
                    vx: item.x,
                    vy: item.y,
                    title: item.title,
                    appIcon: item.appIcon,
                });
            }),
        });
    });
    
    const desktopContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'desktop',
            className: styles.root,
            children: [
                windowContainer.dom,
                iconContainer.dom 
            ],
        },
    });

    appsStore.subscribe(({ apps }) => {
        windowContainer.setProps({
            children: apps.map(item => item.window.dom),
        });
    });

    const windowMouseUp = (e: MouseEvent) => {
        const element = iconContainer.dom.querySelector(`button[data-vx='${appIcon?.x}'][data-vy='${appIcon?.y}']`) as HTMLButtonElement;
        const rootRect = iconContainer.dom.getBoundingClientRect();
        const virtual = convertRealToVirtual(new Vector(e.clientX, e.clientY), rootRect);
        
        if (!appIcon && !element) return; 

        const x = +(element.dataset.vx || 0), 
                y = +(element.dataset.vy || 0);
  
        element.dataset.vx = `${virtual.x}`;
        element.dataset.vy = `${virtual.y}`;
     
        const app:DesktopIconType | undefined = desktopIconStore.getState()
            .find(a => a.x === x && a.y === y);
      
        if (!app) return; 
        
        const clone:DesktopIconType = JSON.parse(JSON.stringify(app));
        clone.x = virtual.x;
        clone.y = virtual.y;
        element.classList.add(styles.transition);
        const real = convertVirtualToReal(virtual, rootRect);
        element.style.setProperty('--x', real.x + 'px');
        element.style.setProperty('--y', real.y + 'px'); 

        timeout = setTimeout(() => {
            desktopIconStore.editIcon(clone);
        }, 200);

        element.classList.remove('grabbing');
        element.style.zIndex = '1';
        appIcon = null;
    };

    const windowMouseMove = (e:MouseEvent) => {
        if (!appIcon) return;
        const element = iconContainer.dom.querySelector(`button[data-vx='${appIcon?.x}'][data-vy='${appIcon?.y}']`) as HTMLButtonElement;
   
        if (!element) return; 
        const elementRect = element.getBoundingClientRect(),
                rootRect = iconContainer.dom.getBoundingClientRect();

        const movementV = new Vector(e.movementX, e.movementY);
        const offset = new Vector(elementRect.x - rootRect.x, elementRect.y - rootRect.y);
       
        const cord = movementV.add(offset)
            .floor();

        element.classList.add('grabbing');
        element.style.zIndex = desktopIconStore.getState().length + '';
        element.style.setProperty('--x', Math.floor( clampNumber(cord.x, 0, rootRect.right - elementRect.width)) + 'px');
        element.style.setProperty('--y', Math.floor( clampNumber(cord.y, 0, rootRect.height - elementRect.height ) ) + 'px'); 
    };

    window.addEventListener('mouseup', windowMouseUp );
    window.addEventListener('mousemove', windowMouseMove );

    return (
        desktopContainer
            .onUnMount(() => {
                window.removeEventListener('mouseup', windowMouseUp );
                window.removeEventListener('mousemove', windowMouseMove );
            })
            .dom
    );
}

export default Desktop;
