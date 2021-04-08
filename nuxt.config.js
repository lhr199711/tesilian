import path from 'path'

const ENV_NAME = process.env.NODE_ENV

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    // harry 192.168.110.32
    server: {
        port: 3333,
        // host: '192.168.110.32'
        host: '127.0.0.1'
    },
    target: 'server',
    head: {
        title: 'tacos-pad',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { charset: 'utf-8', type: 'text/javascript', src: '/flexible.js' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'vant/lib/index.less',
        './assets/style/base.less'
    ],
    router: {
        middleware: ['getToken']
    },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/vue-global.js', ssr: true },
        { src: '~/plugins/axios.js', ssr: true },
        { src: '~/plugins/request.js', ssr: true },
        { src: '~/plugins/api.js', ssr: true },
        { src: '~/plugins/icon.js' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        ['@nuxtjs/dotenv', {
            path: 'env/', // 配置文件所在目录
            filename: `.env.${ENV_NAME}` // 配置文件名称
        }],
        '@radial-color-picker/vue-color-picker/nuxt'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // baseURL: process.env.NODE_ENV !== 'production' ? 'http://192.168.112.59:8090' : 'https://正式',
        proxy: true
    },
    proxy: {
        '/api1': {
            target: 'http://192.168.111.120:8090/',
            changeOrigin: true,
            pathRewrite: {
                '^/api1': ''
            }
        },
        '/api2': { //  /api是指真实接口域名后的一个层级
            // target: 'http://192.168.111.120:8090/',
            target: 'http://127.0.0.1:8090/',
            changeOrigin: true,
            pathRewrite: {
                '^/api2': ''// "/api"与上面的api相同
            }
        },
        '/api3': { //  /api是指真实接口域名后的一个层级
            target: 'http://127.0.0.1:8090/',
            changeOrigin: true,
            pathRewrite: {
                '^/api3': ''// "/api"与上面的api相同
            }
        }

    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/vant.*?less/],
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'vant',
                        // 指定样式路径
                        style: name => `${name}/style/less`
                    },
                    'vant'
                ]
            ]
        },
        loaders: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    hack: `true; @import "${path.join(__dirname, './assets/style/config.less')}";`
                }
            }
        },
        postcss: {
            plugins: {
                'postcss-pxtorem': {
                    rootValue: 120,
                    minPixelValue: 3,
                    exclude: '/node_modules/',
                    propList: ['*'],
                    selectorBlackList: ['van-']
                }
            }
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000
            }
        },
        extend(config, { isDev, isClient }) {
            if (isClient && !isDev) {
                config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            }

            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
            svgRule.exclude = [path.resolve(__dirname, 'assets/icon/svg')]

            config.module.rules.push({
                test: /\.svg$/,
                include: [path.resolve(__dirname, 'assets/icon/svg')],
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                }
            })
        }
    }
}
