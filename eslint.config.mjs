import tseslint from 'typescript-eslint';
import baseConfig from './eslint-configs/base.config.js';
import { join,dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config({
    extends: [  baseConfig],
    files: [ '**/*.{js,mjs,cjs,ts,mts,cts}' ],
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            parser: tseslint.parser,
            project: join(__dirname, 'tsconfig.json'),
            ecmaFeatures: { jsx: true },
            tsconfigRootDir: __dirname,
        },
    },
    ignores: [
        'dist/**',
        './eslint-configs/custom/comment-tag.js',
        './eslint-configs/*',
        './vite.config.ts',
        '**/*.config.*',
    ],
});
