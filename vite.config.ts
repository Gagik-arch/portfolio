import { defineConfig } from 'vite';
import { resolve } from 'path';

/* https://vitejs.dev/config/ */
export default defineConfig({
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
        },
    },
    build: {
    target: 'es2022',
    minify: 'esbuild', // Fast and compact; or install 'terser' for slightly smaller output
    sourcemap: false,  // Ensures no .map files bloat your dist/ folder
    cssMinify: true,
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB as base64 to save HTTP requests
    rollupOptions: {
      output: {
        // Split vendor libraries (@nuvo-js/core, datewise) into a separate cacheable chunk
        manualChunks: {
          vendor: ['@nuvo-js/core', 'datewise'],
        },
      },
    },
  },
  esbuild: {
    // Strip console logs and debugger statements in production builds
    drop: ['console', 'debugger'],
  },
});