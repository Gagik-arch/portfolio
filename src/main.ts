import './style.css';
import Root from './Root';
import { createRoot } from '$lib/index';
import './utils/prototypes';
import { generateCalendarAppIcon } from './utils';

void (async() => {
    try {
        const root = document.getElementById('app');
        await generateCalendarAppIcon();

        if (root) {
            createRoot(root, Root());
        }
    } catch (error) {
        console.error(error);
    }
})();
