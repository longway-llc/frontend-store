module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        // 'plugin:jest/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    plugins: [
        'react',
        '@typescript-eslint',
        // 'jest',
        'jsx-a11y',
        'import',
        'simple-import-sort',
    ],
    env: {
        browser: true,
        es6: true,
        // jest: true,
        'node': true
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // например @types/yandex-maps без этого нормально не линтится
            },
        },
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'import/imports-first': 1,
        'import/prefer-default-export': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': ['error', { exceptions: ['Component'] }],
        'semi': ['error', 'never'],
        '@typescript-eslint/semi': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-param-reassign': [
            'error',
            { props: true, ignorePropertyModificationsFor: ['draft', 'acc'] },
        ],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "invalidHref", "preferButton" ]
        }],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': ['off'],
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // Packages. `react` related packages come first.
                            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                            ['^react', '^@?\\w+'],
                            // Absolute imports
                            [`^@/`],
                            // parent imports
                            ['^../*'],
                            // Relative imports
                            ['^./*'],
                        ],
                    },
                ],
            },
        },
    ],
}
