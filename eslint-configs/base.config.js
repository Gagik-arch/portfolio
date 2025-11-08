import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import tagComment from './custom/comment-tag.config.js';

export default [
    ...tseslint.config({
        plugins: {
            '@stylistic': stylistic,
            import: importPlugin,
            '@custom': {
                rules: {
                    'tag-comment': tagComment,
                },
            },
        },
        files: [ '**/*.js' ],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.strict,
            tseslint.configs.stylistic
        ],
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',

            '@custom/tag-comment': [ 'error' ],

// NOTE:   import rules
            'no-console': [ 'error', { allow: [ 'info', 'error' ] } ],
            'import/no-duplicates': 'error',
            'import/no-mutable-exports': 'warn',
            'import/no-unresolved': 'off',

            // NOTE:  stylelint
            '@stylistic/indent-binary-ops': [ 'error', 4 ],
            '@stylistic/indent': [
                'error',
                4,
                {
                    ignoreComments: true,
                    SwitchCase: 2,
                    VariableDeclarator: 2,
                    ignoredNodes: [  ],
                }
            ],
            '@/max-len': [
                'error', {
                    code: 180,
                    ignoreUrls: true,
                    ignoreTemplateLiterals: true,
                    ignoreStrings: true,
                }
            ],
            '@stylistic/array-bracket-newline': [
                'error',{ "multiline": true }
            ],
            '@stylistic/array-bracket-spacing': [
                'error',
                'always',
                {
                    singleValue: true, objectsInArrays: true,
                }
            ],
            '@stylistic/array-element-newline': [
                'error', {
                    minItems: 2,
                }
            ],
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/block-spacing': 'error',
            '@stylistic/brace-style': 'error',
            '@stylistic/comma-spacing': [
                'error', {
                    before: false, after: true,
                }
            ],
            '@stylistic/comma-style': [ 'error', 'last' ],
            '@stylistic/comma-dangle': [
                'error', {
                    arrays: 'never',
                    objects: 'always-multiline',
                    imports: 'never',
                    exports: 'never',
                    functions: 'never',
                    importAttributes: 'never',
                    dynamicImports: 'never',
                }
            ],
            '@stylistic/computed-property-spacing': [ 'error', 'never' ],
            '@stylistic/eol-last': [ 'error', 'always' ],
            '@stylistic/function-call-spacing': [ 'error', 'never' ],
            '@stylistic/function-paren-newline': [ 'error','consistent'],
            '@stylistic/implicit-arrow-linebreak': [ 'error', 'beside' ],
            '@stylistic/quotes': [ 'error', 'single' ],
            '@stylistic/key-spacing': [
                'error', {
                    beforeColon: false,
                    afterColon: true,
                }
            ],
            '@stylistic/keyword-spacing': [ 'error', { before: true } ],
            '@stylistic/lines-around-comment': [
                'error', {
                    beforeBlockComment: true,
                    afterBlockComment: false,
                    beforeLineComment: true,
                    afterLineComment: false,
                }
            ],
            '@stylistic/lines-between-class-members': [
                'error', {
                    enforce: [
                        {
                            blankLine: 'always', prev: 'field', next: 'method',
                        },
                        {
                            blankLine: 'always', prev: 'method', next: 'method',
                        },
                        {
                            blankLine: 'never', prev: 'field', next: 'field',
                        }
                    ],
                }
            ],
            '@stylistic/max-statements-per-line': [
                'error', {
                    max: 1, ignoredNodes: [ 'BreakStatement' ],
                }
            ],
            '@stylistic/member-delimiter-style': [
                'error', {
                    multiline: {
                        delimiter: 'semi',
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: 'semi',
                        requireLast: true,
                    },
                }
            ],
            '@stylistic/multiline-ternary': [ 'error', 'always-multiline' ],
            '@stylistic/newline-per-chained-call': [
                'error', {
                    ignoreChainWithDepth: 1,
                }
            ],
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-floating-decimal': 'error',
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/no-multiple-empty-lines': [
                'error', {
                    max: 1, maxEOF: 1,
                }
            ],
            '@stylistic/lines-between-class-members': ["error",'always', {
                exceptAfterSingleLine: true,
                "exceptAfterOverload": false 
             }],
            '@stylistic/no-whitespace-before-property': 'error',
            '@stylistic/nonblock-statement-body-position': [ 'error', 'beside' ],
            '@stylistic/object-curly-newline': [
                'error', {
                    ObjectExpression: {
                        multiline: true, minProperties: 2, consistent: true,
                    },
                    ObjectPattern: {
                        multiline: true, minProperties: 2, consistent: true,
                    },
                    ImportDeclaration: {
                        multiline: true, minProperties: 3, consistent: true,
                    },
                    ExportDeclaration: {
                        multiline: true, minProperties: 3, consistent: true,
                    },
                }
            ],
            '@stylistic/object-curly-spacing': [
                'error',
                'always',
                {
                    arraysInObjects: true, objectsInObjects: true,
                }
            ],
            '@stylistic/one-var-declaration-per-line': [ 'error', 'initializations' ],
            '@stylistic/operator-linebreak': [ 'error', 'before' ],
            '@stylistic/quote-props': [ 'error', 'as-needed' ],
            '@stylistic/rest-spread-spacing': [ 'error', 'never' ],
            '@stylistic/semi': [ 'error', 'always' ],
            '@stylistic/semi-spacing': 'error',
            '@stylistic/semi-style': [ 'error', 'last' ],
            '@stylistic/space-before-blocks': [ 'error' ],
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/space-unary-ops': 'error',
            '@stylistic/switch-colon-spacing': [
                'error', {
                    after: true, before: false,
                }
            ],
            '@stylistic/template-curly-spacing': 'error',
            '@stylistic/template-tag-spacing': 'error',
            'spaced-comment': [ 'error', 'always' ],
        },
    }), { // NOTE:  typescript
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        files: [ '**/*.ts', '**/*.tsx' ],
        rules: {
            '@typescript-eslint/restrict-template-expressions': [
                'error', {
                    allowAny: true,
                    allowNullish: true,
                    allowBoolean: true,
                    allowNumber: true,
                    allowRegExp: true,
                }
            ],
            '@typescript-eslint/no-unnecessary-condition': 'error',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/consistent-indexed-object-style': 'error',
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-duplicate-enum-values': 'error',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-invalid-void-type': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-mixed-enums': 'error',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-redundant-type-constituents': 'error',
            '@typescript-eslint/no-unnecessary-template-expression': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-declaration-merging': 'error',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-unary-minus': 'error',
            '@typescript-eslint/no-unused-expressions': 'error',
            '@typescript-eslint/no-useless-empty-export': 'error',
            '@typescript-eslint/no-wrapper-object-types': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn', {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                }
            ],
            '@typescript-eslint/no-use-before-define': 'error',
            '@typescript-eslint/prefer-enum-initializers': 'off',
            '@typescript-eslint/prefer-find': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-promise-reject-errors': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/triple-slash-reference': 'error',
            '@typescript-eslint/typedef': 'error',
            '@typescript-eslint/unified-signatures': 'error',
            '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-case-declarations': 'off',
            '@typescript-eslint/no-extraneous-class': 'off',
        },
    }
];
