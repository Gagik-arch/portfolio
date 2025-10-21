import Store from '$lib/store';
import type App from '$components/App';

interface AppsState {
    focusedAppId: number | undefined;
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
            ...state,
            apps: [
                ...state.apps,
                app 
            ],
        }));

    }
}

const appsStore = new AppsStore();

export default appsStore;
