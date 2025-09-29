class Store <T> {
    public state: T;

    public constructor(initialState:T) {
        this.state = initialState;
    }

    public subscribe(callback:(state:T)=>T) {
        return callback(this.state);
    }

}

export default Store;
