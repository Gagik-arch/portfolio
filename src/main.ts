import './style.css';
import Root from './Root';
import { createRoot } from '@nuvo-js/core';
import generateCalendarAppIcon from './utils/generateCalendarAppIcon';

void (async () => {
    const root = document.getElementById('root');

    if (!root) return; 
    
    try {
        await generateCalendarAppIcon();
    } catch (error) {
        console.error(error);
    } finally { 
        createRoot(root, Root());
    }
})();
