import type Window from '$components/Window';

export interface AppProps {
    name: string;
    appIcon?: string | number;
    window: Window;
}
