import type Window from '$components/Window';

export interface AppProps {
    name: string;
    appIcon?: string;
    window: Window;
    isNative?: boolean;
}

export interface AppData {
    name: AppProps['name'];
    appIcon: AppProps['appIcon']; 
    isNative: AppProps['isNative']; 
    createdAt: number; 
}
