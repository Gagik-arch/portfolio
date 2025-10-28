import './style.css';
import Root from './Root';
import { createRoot } from '$lib/index';
import './utils/prototypes';

const root = document.getElementById('app');

if (root) {
    createRoot(root, Root());
}
