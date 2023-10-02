// https://eslint.org/docs/latest/use/command-line-interface
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md#configuration
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        // react version > 17 recommends this config
        'plugin:react/jsx-runtime',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'prettier'
    ],
    rules: {
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        },
        // https://github.com/johvin/eslint-import-resolver-alias#readme
        'import/resolver': {
            alias: {
                map: [
                    ['assets', './src/assets'],
                    ['components', './src/components'],
                    ['config', './src/config'],
                    ['forms', './src/forms'],
                    ['hooks', './src/hooks'],
                    ['navigation', './src/navigation'],
                    ['pages', './src/pages'],
                    ['styles', './src/styles'],
                    ['types', './src/types'],
                    ['utils', './src/utils'],
                    ['VersionInfo', './src/VersionInfo.js'],
                    // demo image for prototyping purposes
                    ['DemoImage', './src/DemoImage.js']
                ],
                extensions: ['.scss', '.js', '.jsx', '.json']
            }
        }
    }
};
