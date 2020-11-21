import colors from 'vuetify/es5/util/colors'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  ssr: false,

  env: {
    backendApi: process.env.BACKEND_API || 'http://localhost:8080',
    WS_URL: 'https://videocall-rtc.herokuapp.com'  || 'http://localhost:3000'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'gestao-consulta-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/socket.io.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
  ],
/*
** vuetify module configuration
** https://github.com/nuxt-community/vuetify-module
*/
vuetify: {
  customVariables: ['~/assets/variables.scss'],
    theme: {
    dark: false,
      themes: {
      dark: {
        primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
      }
    }
  }
},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
