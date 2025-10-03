import Store from '$lib/store';

class TestStore extends Store<number> {
    public constructor() {
        super(0);
    }
}

const testStore = new TestStore();

export default testStore;
