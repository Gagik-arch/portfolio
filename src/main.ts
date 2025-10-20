import './style.css';
import Root from './Root';
import { createRoot } from '$lib/index';

const root = document.getElementById('app');

if (root) {
    createRoot(root, Root());
}
