import type { AppProps } from './types';
import { genRandomNumber } from '$utils/index';

class App { 
    public name: AppProps['name'];
    public appIcon: AppProps['appIcon'];
    public window: AppProps['window'];
    public id: string;

    public constructor({
        name,
        appIcon,
        window,
    }: AppProps) {
        this.name = name;
        this.appIcon = appIcon;
        this.window = window;
        this.id = genRandomNumber(1_000_000, 10_000_000)
            .toString();
        
        this.window.setProps({
            id: this.id + '',
        });
       
    }
}

export default App;
