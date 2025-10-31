import Store from '$lib/store';
import advelitIcon from '$assets/images/app-icons/advelit.png';
import type { DesktopIconType } from '$types/index';

// const initialState:DesktopIconType[] = [
//     {
//         x: 0,
//         y: 0,
//         title: 'Advelit',
//         appIcon: advelitIcon,
//     },
//     {
//         x: 0,
//         y: 1,
//         title: 'Advelit2',
//         appIcon: advelitIcon,
//     }
// ];
const initialState: DesktopIconType[] = Array.from({ length: 2 }, (_, k) => ({
    x: 0,
    y: k,
    title: 'Advelit' + k,
    appIcon: advelitIcon,
}));

class DesktopIconStore extends Store<DesktopIconType[]> {
    public constructor() {
        super(initialState);
    }

    public editIcon(app: DesktopIconType) { 
        const state:DesktopIconType[] = JSON.parse(JSON.stringify(this.getState()));
        state.map((a) => {
            if (a.title === app.title) {
                a.x = app.x;
                a.y = app.y;
                return a;
            }
            return a;
        });
        
        this.setState(state);
    }
}

const desktopIconStore = new DesktopIconStore();

export default desktopIconStore;
