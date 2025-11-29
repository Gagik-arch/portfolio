import Store from '$lib/store';
import type App from '$components/App';
import type { DesktopIconType } from '$types/index';
import advelitIcon from '$assets/images/app-icons/advelit.png';
import fibiIcon from '$assets/images/app-icons/fibi.png';
import datewiseIcon from '$assets/images/app-icons/datewise256.png';
import { extractRangeFromIconToIcon } from '$components/Desktop/utils';
import previewIcon from '$assets/images/app-icons/preview.png';

const initialState:DesktopIconType[] = [
    {
        index: 0,
        title: 'Advelit',
        appIcon: advelitIcon,
    },
    {
        index: 1,
        title: 'Fibi',
        appIcon: fibiIcon,
    },
    {
        index: 2,
        title: 'Datewise',
        appIcon: datewiseIcon,
    },
    {
        index: 3,
        title: 'CV',
        appIcon: previewIcon,
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
            activeApps: [],
            appIcons: initialState,
        });
    }

    public addApp(app: App) { 
        this.setState((state) => ({
            ...state,
            focusedAppId: app.window.dom.id,
            activeApps: [
                ...state.activeApps,
                app 
            ],
        }));
    }

    public setFocusApp(id: AppsState['focusedAppId'] | undefined) { 
     
        this.setState((state) => {
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

    public replaceIcon(newIndex: number, prevIndex: number, length: number) { 
        if (prevIndex === newIndex) return; 
        
        const prevState = this.getState();
        const cloneAppIcons: (DesktopIconType | null)[] = Array.from({ length }, () => null);
       
        prevState.appIcons.forEach(item => {
            cloneAppIcons[item.index] = item;
        });
            
        const element = structuredClone(cloneAppIcons[prevIndex]);
        if (!element) return; 

        if (cloneAppIcons[newIndex]) {
            if (newIndex > prevIndex) {
                const extractedRange = extractRangeFromIconToIcon(newIndex, cloneAppIcons);
                const clone = structuredClone(extractedRange);
                extractedRange.unshift(element);
                cloneAppIcons[prevIndex] = null;
                cloneAppIcons[newIndex] = element;

                for (let i = newIndex; i < newIndex + extractedRange.length; i++) { 
                    const a = clone.splice(0, 1);
                    
                    cloneAppIcons[i + 1] = a[0];
                }
          
            } else {
                const extractedRange = extractRangeFromIconToIcon(newIndex, cloneAppIcons);
          
                if (extractedRange.length) {
                    cloneAppIcons.splice(prevIndex, 1);
                    cloneAppIcons.splice(newIndex, 0, element);
                } else { 
                    cloneAppIcons[prevIndex] = null;
                    const prevElement = structuredClone( cloneAppIcons[newIndex]);

                    cloneAppIcons[newIndex] = element;
                    cloneAppIcons[newIndex + 1] = prevElement;
                }
            }
        } else {
            cloneAppIcons[newIndex] = element;
            cloneAppIcons.splice(prevIndex, 1, null);
        }

        const result: DesktopIconType[] = [];
        
        cloneAppIcons.forEach((item, index) => {
            if (item) {
                item.index = index;
                result[result.length] = item;
            }
        });
     
        this.setState({
            ...prevState, appIcons: result,
        });
    }

    public removeApp(id: string) { 
        this.setState(prev => ( {
            ...prev,
            activeApps: prev.activeApps.filter(item => item.window.dom.id !== id),
        }));
    }
}

const desktopStore = new DesktopStore();

export default desktopStore;
