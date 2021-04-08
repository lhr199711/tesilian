module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        'vue/html-indent': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/no-v-html': [0],
        indent: [0, 4],
        'no-tabs': 'off',
        'space-before-function-paren': 'off',
        'no-console': 'off',
        'prefer-const': 'off'
    }
}
