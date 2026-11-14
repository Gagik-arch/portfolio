import type { TResizeAnchor } from './types';

class WindowManager { 
    public isMouseDowned;
    public resizeAnchor: TResizeAnchor;

    public constructor() { 
        this.isMouseDowned = false;
        this.resizeAnchor = undefined;
    }

    public SetResizeAnchor(resizeAnchor:TResizeAnchor) { 
        this.resizeAnchor = resizeAnchor;
    }

    public SetIsMouseDowned(isMouseDowned:boolean ) { 
        this.isMouseDowned = isMouseDowned;
    }
}

export default WindowManager;
