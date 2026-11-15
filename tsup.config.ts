import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/types.ts'],
    format: ['esm'],
    dts: true,
    minify: true,
    clean: true,
    // Tell esbuild how to handle image formats
    loader: {
        '.avif': 'file', // or 'dataurl' if you want it embedded inline
        '.png': 'file',
        '.jpg': 'file',
        '.pdf': 'file'
    }
});