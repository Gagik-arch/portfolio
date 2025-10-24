import type { AppProps } from './types';
class App { 
    public name: AppProps['name'];
    public appIcon: AppProps['appIcon'];
    public window: AppProps['window'];

    public constructor({
        name,
        appIcon,
        window,
    }: AppProps) {
        this.name = name;
        this.appIcon = appIcon;
        this.window = window;
    }
}

export default App;
