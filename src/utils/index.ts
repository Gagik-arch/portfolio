import Element from '$lib/Element';

export const minNumberIndex = (arr: number[]): number => {
    return arr.reduce((r, v, i, a) => v > a[r] ? r : i, -1);
};

export const clampNumber = (num:number, min:number, max:number) => {
    return Math.max(min, Math.min(num, max));
};

export const getCssVariable = <T extends string | number>(key:string, element: HTMLElement = document.body ):T => {
    const style = window.getComputedStyle(element);
    const variable = style.getPropertyValue(key);

    return (isNaN(+variable) ? variable : +variable ) as T;
};

export const genRandomNumber = (min = 0, max = 10) => {
    if (min > max) throw new Error('max num must be greater than min');

    return min + Math.floor(Math.random() * (max - min) );
};

export const isObject = (val: unknown): val is Record<string, unknown> => val !== null && typeof val === 'object';

export const onCssVariableChange = (element:HTMLElement, callback:(e:string)=>void) => {
    const styleObserver = new MutationObserver((mutations) => {
        const currentValue = getCssVariable<string>('--offset', mutations[0].target as HTMLElement);
        
        callback(currentValue);
    });

    styleObserver.observe(element, {
        attributes: true,
        attributeFilter: [ 'style' ],
    });

    return () => styleObserver.disconnect();
};

export const isStrictDesktop = () => {
    const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent);

    return !isMobileUA && navigator.maxTouchPoints === 0;
};

export const generateCalendarAppIcon = async () => { 
    const imageType = 'image/png';
    const width = 256, 
            height = 256;

    const canvas = new Element<HTMLCanvasElement>({
        rootElement: document.body,
        tagName: 'canvas',
        props: {
            id: 'fake-canvas',
            style: {
                display: 'none',
            },
        },
    });
        
    canvas.dom.width = width;
    canvas.dom.height = height;

    canvas.setProps({
        style: {
            marginLeft: '50px',
            borderRadius: '50px',
        },
    });

    const ctx = canvas.dom.getContext('2d');
    if (!ctx) return; 

    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 252, 252, 0.9)';
    ctx.roundRect(1, 1, width - 2, height - 2, 56);
    ctx.fill();
    ctx.beginPath();
    
    await document.fonts.load('500 1px SFProText');
 
    ctx.font = '500 50px SFProText'; 
  
    ctx.fillStyle = 'rgb(254 96 88)'; 
    ctx.textAlign = 'center'; 
    ctx.fillText(month, canvas.dom.width / 2, 80);

    ctx.font = '500 130px SFProText'; 
    ctx.fillStyle = 'rgba(20,20,20,0.8)'; 
    ctx.textAlign = 'center'; 
    ctx.fillText(date.getDate()
        .toString(), canvas.dom.width / 2, 200);
       
    const imageDataURL = canvas.dom.toDataURL(imageType);
    localStorage.setItem('calendarIcon', imageDataURL);
};
    
