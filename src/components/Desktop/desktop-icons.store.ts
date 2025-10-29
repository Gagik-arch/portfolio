import Store from '$lib/store';
import type App from '$components/App';

interface AppsState {
    focusedAppId: string | undefined;
    apps: App[];
}

class DesktopIconStore extends Store<AppsState> {
    public constructor() {
        super({
            focusedAppId: undefined,
            apps: [],
        });
    }

    public editIconposition(app:App) { 
        this.setState((state) => ({
            focusedAppId: app.name,
            apps: [
                ...state.apps,
                app 
            ],
        }));
    }

}

const appsStore = new DesktopIconStore();

export default appsStore;
