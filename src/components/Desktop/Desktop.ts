import { Element, Store } from '@nuvo-js/core';
import styles from './style.module.css';
import desktopStore from '$store/desktop.store';
import Vector from '$utils/trigonometry/Vector';
import DesktopIcon from './DesktopIcon';
import {
    convertIndexToVirtual,
    convertRealToVirtual, convertVirtualToIndex, convertVirtualToReal 
} from './utils';
import type { DesktopIconType } from '$types/index';
import { getAppIcon, clamp } from '$utils/index';
import type APPS from '$apps/index';
import dockIconsStore from '$store/dockIcons.store';

function Desktop() {
    const stack = new Store<(keyof typeof APPS)[]>([]);
    let appIcon:DesktopIconType | null = null, 
            timeout: number | undefined = undefined,
            stackTimeout : number | undefined = undefined;

    const onDoubleClickAppIcon = (title: keyof typeof APPS) => {
        const existsInDock = desktopStore.GetState()
            .activeApps.find(e => e.name === title);
     
        if (existsInDock) {
            desktopStore.setFocusApp( existsInDock.window.dom.id);
            return;
        }  

        stack.SetState(prev => ([
            ...prev,
            title 
        ]));
    };

    stack.Subscribe((state) => {
        clearTimeout(stackTimeout);

        if (state.length === 0) {
            stackTimeout = undefined;
            return;
        }

        stackTimeout = setTimeout(() => {
            stackTimeout = undefined;

            const titles = stack.GetState();

            if (titles.length === 0) return;
            stack.SetState([]);

            const apps = titles.map((title) => ({
                title, image: getAppIcon(title) || '', 
            }));

            dockIconsStore.SetState(prev => [
                ...prev,
                ...apps.map(({
                    title, image, 
                }) => ({
                    title,
                    image,
                }))
            ]);
        }, 800);
    });

    const calculateIconPlace = (item:DesktopIconType, dom:HTMLElement) => {
        const virtual = convertIndexToVirtual(item.index, dom.getBoundingClientRect());
       
        const real = convertVirtualToReal(
            virtual,
            dom.getBoundingClientRect()
        );

        return DesktopIcon({
            x: real.x,
            y: real.y,
            index: item.index,
            title: item.title,
            onDoubleClick: () => onDoubleClickAppIcon(item.title),
        });

    };
    
    const desktopContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'desktop',
            className: styles.root,
            events: {
                onmousedown: (e) => {
                    clearTimeout(timeout);

                    const target = (e.target as HTMLElement).closest('.' + styles.app_icon) as HTMLButtonElement | undefined;

                    if (!target) return; 
                    const index = +(target.dataset.index || 0);

                    target.classList.remove(styles.transition);
             
                    const app:DesktopIconType | undefined = desktopStore.GetState().appIcons
                        .find(a => a.index === index);
         
                    if (!app) return; 
                        
                    appIcon = app;
                },
            },
        },
    })
        .OnMount((e) => {
            e.SetProps({
                children: desktopStore.GetState().appIcons
                    .map(item => calculateIconPlace(item, e.dom)),
            });
        });

    desktopStore.Subscribe(({
        activeApps, appIcons, 
    }) => {

        desktopContainer.SetProps({
            children: [
                ...appIcons.map(item => calculateIconPlace(item, desktopContainer.dom)),

                ...activeApps.map(item => item.window.dom)
            ],
        });
    });

    const windowMouseUp = (e: MouseEvent) => {
        if (!appIcon) return; 

        const element = desktopContainer.dom.querySelector(`button[data-index='${appIcon.index}']`) as HTMLButtonElement;
        
        const rootRect = desktopContainer.dom.getBoundingClientRect();
        const newVirtual = convertRealToVirtual(new Vector(e.clientX, e.clientY), rootRect);
        const newIndex = convertVirtualToIndex(newVirtual, rootRect);
   
        const prevIndex = appIcon.index;

        const h = Math.floor(rootRect.height / 100);
        const w = Math.floor(rootRect.width / 100);
        const length = w * h;

        const lastIcon = desktopStore.GetState().appIcons.find(item => item.index === length - 1);

        if (newIndex === length - 1 && lastIcon) {
            const virtual = convertIndexToVirtual(prevIndex, rootRect);
            const real = convertVirtualToReal(virtual, rootRect);

            element.style.setProperty('--x', real.x + 'px');
            element.style.setProperty('--y', real.y + 'px'); 
            element.classList.add(styles.transition);
        } else { 
            const real = convertVirtualToReal(newVirtual, rootRect);
            element.style.setProperty('--x', real.x + 'px');
            element.style.setProperty('--y', real.y + 'px'); 
            element.classList.add(styles.transition);
            
            timeout = setTimeout(() => {
                desktopStore.replaceIcon(newIndex, prevIndex, length);
            }, 200);
        }

        element.classList.remove('grabbing');
  
        appIcon = null;
    };

    const windowMouseMove = (e: MouseEvent) => {
        if (!appIcon) return;
        
        const element = desktopContainer.dom.querySelector(`button[data-index='${appIcon.index}']`) as HTMLButtonElement;
    
        const rootRect = desktopContainer.dom.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const movementV = new Vector(e.movementX, e.movementY);
        const offset = new Vector(elementRect.x - rootRect.x, elementRect.y - rootRect.y);
   
        const cord = movementV.Add(offset)
            .Floor();
        
        element.classList.add('grabbing');

        element.style.setProperty('--x', Math.floor( clamp(cord.x, 0, rootRect.right - elementRect.width)) + 'px');
        element.style.setProperty('--y', Math.floor( clamp(cord.y, 0, rootRect.height - elementRect.height ) ) + 'px'); 
    };

    window.addEventListener('mouseup', windowMouseUp );
    window.addEventListener('mousemove', windowMouseMove );

    return (
        desktopContainer
            .OnUnMount(() => {
                window.removeEventListener('mouseup', windowMouseUp );
                window.removeEventListener('mousemove', windowMouseMove );
            })
            .dom
    );
}

export default Desktop;
