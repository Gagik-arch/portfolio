import Element from '$lib/Element';
import styles from './style.module.css';
import desktopStore from '$store/desktop.store';
import Vector from '$utils/trigonometry/Vector';
import DesktopIcon from './DesktopIcon';
import {
    convertIndexTOVirtual,
    convertRealToVirtual, convertVirtualToIndex, convertVirtualToReal 
} from './utils';
import type { DesktopIconType } from '$types/index';
import { clampNumber } from '$utils/index';

function Desktop() {
    let appIcon:DesktopIconType | null = null, 
            timeout: number | undefined = undefined;
    
    const desktopContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'desktop',
            className: styles.root,
            events: {
                onmousedown: (e) => {
                    clearTimeout(timeout);

                    const target = (e.target as HTMLElement).closest('.' + styles.app_icon) as HTMLButtonElement;
                    if (target) {
                        const virtual = new Vector(+(target.dataset.vx || 0), +(target.dataset.vy || 0));

                        const index = convertVirtualToIndex(virtual, desktopContainer.dom.getBoundingClientRect());
                        target.classList.remove(styles.transition);
             
                        const app:DesktopIconType | undefined = desktopStore.getState().appIcons
                            .find(a => a.index === index);
         
                        if (!app) return; 
                        
                        appIcon = app;
                        
                    }
                },
            },
        },
    })
        .onMount((e) => {
            e.setProps({
                children: desktopStore.getState().appIcons
                    .map(item => {
                        const virtual = convertIndexTOVirtual(item.index, e.dom.getBoundingClientRect());
                        
                        const real = convertVirtualToReal(
                            virtual,
                            e.dom.getBoundingClientRect()
                        );

                        return DesktopIcon({
                            x: real.x,
                            y: real.y,
                            vx: virtual.x,
                            vy: virtual.y,
                            title: item.title,
                            appIcon: item.appIcon,
                        });
                    }),
            });
        });

    desktopStore.subscribe(({
        activeApps, appIcons, 
    }) => {
        desktopContainer.setProps({
            children: [
                ...appIcons.map(item => {
                    const virtual = convertIndexTOVirtual(item.index, desktopContainer.dom.getBoundingClientRect());

                    const real = convertVirtualToReal(
                        virtual,
                        desktopContainer.dom.getBoundingClientRect()
                    );

                    return DesktopIcon({
                        x: real.x,
                        y: real.y,
                        vx: virtual.x,
                        vy: virtual.y,
                        title: item.title,
                        appIcon: item.appIcon,
                    });
                }),
                ...activeApps.map(item => item.window.dom)
            ],
        });
    });

    const windowMouseUp = (e: MouseEvent) => {
        if (!appIcon) return; 

        const rootRect = desktopContainer.dom.getBoundingClientRect();
        const virtual = convertIndexTOVirtual(appIcon.index, rootRect);
        const element = desktopContainer.dom.querySelector(`button[data-vx='${virtual?.x}'][data-vy='${virtual?.y}']`) as HTMLButtonElement;
        
        if ( !element ) return; 

        const newVirtual = convertRealToVirtual(new Vector(e.clientX, e.clientY), rootRect);

        const clone:DesktopIconType = structuredClone(appIcon);
        clone.x = newVirtual.x;
        clone.y = newVirtual.y;
        
        const real = convertVirtualToReal(newVirtual, rootRect);
        element.style.setProperty('--x', real.x + 'px');
        element.style.setProperty('--y', real.y + 'px'); 
        element.classList.add(styles.transition);

        timeout = setTimeout(() => {
            desktopStore.editIcon(clone);
        }, 200);

        element.classList.remove('grabbing');
  
        appIcon = null;
    };

    const windowMouseMove = (e:MouseEvent) => {
        if (!appIcon) return;
        const rootRect = desktopContainer.dom.getBoundingClientRect();
        const virtual = convertIndexTOVirtual(appIcon.index, desktopContainer.dom.getBoundingClientRect());

        const element = desktopContainer.dom.querySelector(`button[data-vx='${virtual?.x}'][data-vy='${virtual?.y}']`) as HTMLButtonElement;
   
        if (!element) return; 
        const elementRect = element.getBoundingClientRect();

        const movementV = new Vector(e.movementX, e.movementY);
        const offset = new Vector(elementRect.x - rootRect.x, elementRect.y - rootRect.y);
   
        const cord = movementV.add(offset)
            .floor();
        
        element.classList.add('grabbing');
        element.style.zIndex = ' 3';

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
