import Store from '$lib/store';
import type App from '$components/App';
import type { DesktopIconType } from '$types/index';
import advelitIcon from '$assets/images/app-icons/advelit.png';
import fibiIcon from '$assets/images/app-icons/fibi.png';

const initialState:DesktopIconType[] = [
    {
        x: 0,
        y: 0,
        title: 'Advelit',
        appIcon: advelitIcon,
    },
    {
        x: 0,
        y: 1,
        title: 'Fibi',
        appIcon: fibiIcon,
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

    public updateApps(app:App) { 
        this.setState((state) => ({
            ...state,
            focusedAppId: app.window.id,
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
                if (app.window.id === id) {
                    target = app;
                } else {
                    result.push(app);
                }
            }
            if (target) result.push(target);

            return ({
                ...state,
                apps: result,
                focusedAppId: id,
            } ); 
        });
    }

    public editIcon(app: DesktopIconType) { 
        const appIcons:DesktopIconType[] = JSON.parse(JSON.stringify(this.getState().appIcons));
        appIcons.map((a) => {
            if (a.title === app.title) {
                a.x = app.x;
                a.y = app.y;
                return a;
            }
            return a;
        });
        
        this.setState(prev => ({
            ...prev, appIcons, 
        }));
    }
}

const desktopStore = new DesktopStore();

export default desktopStore;
