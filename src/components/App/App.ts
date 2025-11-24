import type { AppData, AppProps } from './types';

class App { 
    public name: AppProps['name'];
    public appIcon: AppProps['appIcon'];
    public window: AppProps['window'];
    public isNative: AppProps['isNative'];
    public createdAt: number;

    public constructor({
        name,
        appIcon,
        window,
        isNative = false,
    }: AppProps) {
        this.name = name;
        this.appIcon = appIcon;
        this.window = window;
        this.isNative = isNative;
        this.createdAt = new Date()
            .getTime();
    }

    public getData():AppData {
        return {
            name: this.name,
            appIcon: this.appIcon,
            isNative: this.isNative,
            createdAt: this.createdAt,
        };
    }
}

export default App;
