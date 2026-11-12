import { Store } from '@nuvo-js/core';
import type APPS from '../apps/index';

export interface IconType {
    title: keyof typeof APPS;
}

const initialState: IconType[] = [

    // {
    //     title: 'Preview',
    // },
    // {
    //     title: 'Npm-packages',
    // }
];

class DockIconsStore extends Store<IconType[]> {
    public constructor() {
        super( initialState );
    }

    public setIcon(icon: IconType) { 
        this.SetState((prev) => ([
            ...prev,
            icon
        ]));
    }

    public removeIcon(title: IconType['title']) { 
        this.SetState((prev) => (prev.filter(item => item.title !== title)));
    }
}

const dockIconsStore = new DockIconsStore();

export default dockIconsStore;
