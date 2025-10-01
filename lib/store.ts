class Store <T> {
    private state: T;
    private listeners: ((state:T)=>void)[] = [];

    public constructor(initialState:T) {
        this.state = initialState;
    }

    public subscribe<K>(callback: (state: T) => K):()=>void {
        this.listeners.push(callback);

        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    public setState(newState: T | ((prev: T) => T)) {
        this.state
            = typeof newState === 'function'
                ? (newState as (prev: T) => T)(this.state)
                : newState;
        this.notify();
    }

    public getState() {
        return this.state;
    }

    private notify() {
        this.listeners.forEach((listener) => {
            listener(this.state);
        } );
    }
}

export default Store;
