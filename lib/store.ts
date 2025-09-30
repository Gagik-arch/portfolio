class Store <T> {
    private state: T;
    private readonly listeners: ((state:T)=>void)[] = [];

    public constructor(initialState:T) {
        this.state = initialState;
    }

    public subscribe<K>(callback: (state: T) => K):K {
        this.listeners.push(callback);
        return callback(this.state);
    }

    private notify() {
        this.listeners.forEach((listener) => {
            listener(this.state);
        } );
    }

    public setState(newState: T | ((prev: T) => T)) {
        this.state
            = typeof newState === 'function'
                ? (newState as (prev: T) => T)(this.state)
                : newState;
        this.notify();
    }
}

export default Store;
