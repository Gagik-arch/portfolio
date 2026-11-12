import { Store } from '@nuvo-js/core';
import type App from '$components/App';
import type { DesktopIconType } from '$types/index';
import { extractRangeFromIconToIcon } from '$components/Desktop/utils';

const initialState: (DesktopIconType & { icon: string; })[] = [
    {
        index: 0,
        title: 'Preview',
        icon: 'Preview',
    },
    {
        index: 1,
        title: 'Npm-packages',
        icon: 'Npm',
    },
    {
        index: 2,
        title: 'Balljunge',
        icon: 'Balljunge',
    },
    {
        index: 3,
        title: 'Fibi',
        icon: 'Fibi',
    },
    {
        index: 4,
        title: 'Advelit',
        icon: 'Advelit',
    },
    {
        index: 5,
        title: 'Axis',
        icon: 'Axis',
    }
];

interface AppsState {
    focusedAppId: string | undefined;
    activeApps: App[];
    appIcons: DesktopIconType[];
}

class DesktopStore extends Store<AppsState> {
    public constructor() {
        super({
            focusedAppId: undefined,
            activeApps: [ ],
            appIcons: initialState,
        });
    }

    public addApp(app: App) { 
        this.SetState((state) => ({
            ...state,
            focusedAppId: app.window.dom.id,
            activeApps: [
                ...state.activeApps,
                app 
            ],
        }));
    }

    public setFocusApp(id: AppsState['focusedAppId'] | undefined) { 
        this.SetState((state) => {
            const result:App[] = [];
            let target; 

            if (id === undefined) { 
                return ({
                    ...state,
                    focusedAppId: undefined,
                });
            }

            for (const app of state.activeApps) { 
                if (app.window.dom.id === id) {
                    target = app;
                } else {
                    result.push(app);
                }
            }
            if (target) result.push(target);
          
            return ({
                ...state,
                activeApps: result,
                focusedAppId: id,
            } ); 
        });
    }

    public replaceIcon(
        newIndex: number,
        prevIndex: number,
        length: number
    ) {
        if (prevIndex === newIndex) return;

        const prevState = this.GetState();

        const appIcons: (DesktopIconType | null)[] = Array.from(
            { length },
            () => null
        );

        prevState.appIcons.forEach(item => {
            appIcons[item.index] = { ...item };
        });

        const element = appIcons[prevIndex] ? { ...appIcons[prevIndex] } : undefined;

        if (!element) return;

        if (appIcons[newIndex]) {
            if (newIndex > prevIndex) {
                const range = extractRangeFromIconToIcon(
                    newIndex,
                    appIcons
                );

                if (newIndex + range.length >= length) return;

                for (let i = range.length - 1; i >= 0; i--) {
                    appIcons[newIndex + i + 1] = range[i];
                }

                appIcons[newIndex] = element;
                appIcons[prevIndex] = null;
            } else {
                
                let range = extractRangeFromIconToIcon(
                    newIndex,
                    appIcons
                );
                
                const isExistsInRange = !!range.find(e => e.title === element.title);

                if (isExistsInRange) { 
                    range = range.slice(0, prevIndex - newIndex);
                }
         
                for (let i = 0; i < range.length; i++) {
                    appIcons[newIndex + i + 1] = range[i];
                }

                appIcons[newIndex] = element;

                if (!isExistsInRange) { 
                    appIcons[prevIndex] = null;
                }

            }
        } else {
            appIcons[newIndex] = element;
            appIcons[prevIndex] = null;
        }

        const result: DesktopIconType[] = [];

        appIcons.forEach((item, index) => {
            if (!item) return;

            item.index = index;
            result.push(item);
        });

        this.SetState({
            ...prevState,
            appIcons: result,
        });
    }

    public removeApp(id: string) { 
        this.SetState(prev => ( {
            ...prev,
            activeApps: prev.activeApps.filter(item => item.window.dom.id !== id),
        }));
    }
}

const desktopStore = new DesktopStore();

export default desktopStore;
