import './style.css';
import App from './App';
import { createRoot } from '$lib/index';

const root = document.getElementById('app');

if (root) {
    createRoot(root, App());
}
