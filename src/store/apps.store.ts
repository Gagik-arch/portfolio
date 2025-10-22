import Store from '$lib/store';
import type App from '$components/App';

interface AppsState {
    focusedAppId: string | undefined;
    apps: App[];
}

class AppsStore extends Store<AppsState> {
    public constructor() {
        super({
            focusedAppId: undefined,
            apps: [],
        });
    }

    public updateApps(app:App) { 
        this.setState((state) => ({
            focusedAppId: app.id,
            apps: [
                ...state.apps,
                app 
            ],
        }));
    }

    public setFocusApp(id: AppsState['focusedAppId']) { 
        this.setState((state) => ({
            ...state,

            focusedAppId: id,
        }));
    }
}

const appsStore = new AppsStore();

export default appsStore;
