import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
    return ({
        resolve: {
            alias: {
                $lib: resolve(__dirname, './lib'),
                $uikit: resolve(__dirname, './src/uikit'),
                $utils: resolve(__dirname, './src/utils'),
                $types: resolve(__dirname, './src/types'),
                $assets: resolve(__dirname, './assets'),
                $store: resolve(__dirname, './src/store'),
                $components: resolve(__dirname, './src/components'),
                $apps: resolve(__dirname, './src/apps'),
                $pages: resolve(__dirname, './src/pages'),
                $packages: resolve(__dirname, './packages'),
            },
        },
        build: {
            target: 'es2022',
            minify: 'esbuild',
            sourcemap: false,
            cssMinify: true,
            assetsInlineLimit: 4096,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['@nuvo-js/core', 'datewise'],
                    },
                },
                external: [
                    './assets/screenshot.png'          
                ]
            },
        },
        esbuild: {
            drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
    })
});