import './style.css';
import Root from './Root';
import { createRoot } from '$lib/index';
import { generateCalendarAppIcon } from './utils';

void (async() => {
    try {
        await generateCalendarAppIcon();
    } catch (error) {
        console.error(error);
    } finally { 
        const root = document.getElementById('app');

        if (root) {
            createRoot(root, Root());
        }
    }
})();
