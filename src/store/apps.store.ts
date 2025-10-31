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
            focusedAppId: app.window.id,
            apps: [
                ...state.apps,
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

            for (const app of state.apps) { 
                if (app.window.id === id) {
                    target = app;
                } else {
                    result.push(app);
                }
            }
            if (target) result.push(target);

            return ({
                apps: result,
                focusedAppId: id,
            } ); 
        });
    }
}

const appsStore = new AppsStore();

export default appsStore;
