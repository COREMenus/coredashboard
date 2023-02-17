import colors from 'vuetify/es5/util/colors'
import en from 'vuetify/lib/locale/en'
import ar from 'vuetify/lib/locale/ar'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Coremenus Dashboard',
        title: 'Coremenus Dashboard',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Coremenus Dashboard' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' },],
        script: [{ src: 'https://kit.fontawesome.com/aeb6e7a7c3.js', crossorigin: 'anonymous' },
        { src: 'https://js.stripe.com/v3/pricing-table.js', async: true }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },

  env: {
    QR_URL: process.env.QR_URL,
    API_BASE_URL: process.env.API_BASE_URL, 
    BASIC_MONTHLY_PRICE: process.env.BASIC_MONTHLY_PRICE,
    BASIC_ANNUAL_PRICE: process.env.BASIC_ANNUAL_PRICE,

    INTER_MONTHLY_PRICE: process.env.INTER_MONTHLY_PRICE,
    INTER_ANNUAL_PRICE: process.env.INTER_ANNUAL_PRICE,

    PREMIUM_MONTHLY_PRICE: process.env.PREMIUM_MONTHLY_PRICE,
    PREMIUM_ANNUAL_PRICE: process.env.PREMIUM_ANNUAL_PRICE
  },

    loading: '~/components/general/Loading.vue',

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['@/plugins/i18n.js', '@/plugins/dibsyVault.js', '@/plugins/dibsy.js', '@/plugins/axios.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/i18n',
        '@nuxtjs/auth-next',
        '@nuxtjs/axios',
        '@nuxtjs/toast',
        '@nuxtjs/proxy'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        proxy: true,
        progress: false,
        retry: { retries: 3 }
    },

    proxy: {
        '/api/': process.env.API_BASE_URL
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        lang: {
            locales: {
                ar,
                en
            },
        },
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#FF6F28',
                    background: '#f0f2f5'
                },
                dark: {
                    primary: '#FF6F28',
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    background: colors.grey.darken4
                },
            },
        },
    },

    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.js',
                dir: 'ltr'
            },
            {
                code: 'ar',
                file: 'ar.js',
                dir: 'rtl'
            }
        ],
        lazy: false,
        langDir: 'lang/',
        strategy: 'prefix',
        defaultLocale: 'en'
    },



    auth: {
        plugins: ['~/plugins/auth.js'],
        redirect: {
            login: '/login',
            home: '/',
            logout: '/login',
            maxAge: '18000'
        },
        strategies: {
            localAdmin: {
                scheme: 'local',
                token: {
                    property: 'token',
                    global: true,
                    type: 'Bearer'
                },
                endpoints: {
                    login: { url: '/api/auth/dashboard/login', method: 'post' },
                    user: { url: '/api/auth/dashboard/me', method: 'get' }
                }
            },
            localUser: {
                scheme: 'local',
                token: {
                    property: 'token',
                    global: true,
                    type: 'Bearer'
                },
                endpoints: {
                    login: { url: '/api/auth/panel/login', method: 'post' },
                    user: { url: '/api/auth/panel/me', method: 'get' }
                }
            }
        }
    },

    toast: {
        position: 'top-center',
        duration: '3000',
        iconPack: 'mdi'
    },

    router: {
        prefetchLinks: false
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            })
        },
    },
}
