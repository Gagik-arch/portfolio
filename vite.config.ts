import { defineConfig } from 'vite';
import { resolve } from 'path';

/* https://vitejs.dev/config/ */
export default defineConfig({
    resolve: {
        alias: {
            $lib: resolve(__dirname, './lib'),
            $uikit: resolve(__dirname, './src/uikit'),
            $types: resolve(__dirname, './src/types'),
            $assets: resolve(__dirname, './src/assets'),
        },
    },
});