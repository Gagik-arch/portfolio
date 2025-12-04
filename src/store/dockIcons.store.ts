import Store from '$lib/store';
import type allApps from '../apps/index';
import cvIcon from '$assets/images/app-icons/preview.png';
export interface IconType {
    image: string;
    title: keyof typeof allApps;
}

const initialState: IconType[] = [

    // {
    //     image: cvIcon,
    //     title: 'CV' as keyof typeof allApps,
    // }
];

class DockIconsStore extends Store<IconType[]> {
    public constructor() {
        super( initialState );
    }

    public setIcon(icon: IconType) { 
        this.setState((prev) => ([
            ...prev,
            icon
        ]));
    }

    public removeIcon(title: IconType['title']) { 
        this.setState((prev) => (prev.filter(item => item.title !== title)));
    }
}

const dockIconsStore = new DockIconsStore();

export default dockIconsStore;
