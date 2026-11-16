import { Element } from '@nuvo-js/core';

const generateCalendarAppIcon = async () => { 
    const imageType = 'image/png';
    const size = 100;

    const canvas = new Element<HTMLCanvasElement>(
        'canvas',
        {
            style: {
                display: 'none',
                borderRadius: '20px',
            },
        },
        document.body
    );
        
    canvas.dom.width = size;
    canvas.dom.height = size;

    const ctx = canvas.dom.getContext('2d');
    if (!ctx) return; 

    const date = new Date();
    const month = date.toLocaleDateString('default', { weekday: 'short' });
    await document.fonts.load('500 1px SFProText');

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 252, 252, 0.9)';
    ctx.roundRect(1, 1, size - 2, size - 2, 24);
    ctx.fill();
    ctx.closePath();
 
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';
    
    ctx.font = '500 24px SFProText'; 
    ctx.fillStyle = 'rgb(254 96 88)'; 
    
    ctx.fillText(month, canvas.dom.width / 2, 30);

    ctx.font = '500 48px SFProText'; 
    ctx.fillStyle = 'rgba(20,20,20,0.8)'; 

    ctx.fillText(date.getDate()
        .toString(), canvas.dom.width / 2, canvas.dom.width / 2 + 20);
       
    const imageDataURL = canvas.dom.toDataURL(imageType);

    if (imageDataURL !== localStorage.getItem('calendarIcon')) { 
        localStorage.setItem('calendarIcon', imageDataURL);
    }

    canvas.Destroy();
};

export default generateCalendarAppIcon;
