import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - carfix-admin',
    title: 'Carfix Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/vuetify'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/proxy'],

  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': {
      target: process.env.URL,
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
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
          success: colors.green.accent3,
          Azul500: '#122566',
          Rojo500: '#CB302E',
          Plomo500: '#273043',
          Hierro500: '#54494B',
          Blanco500: '#F2F2F2',
          Negro500: '#2F2F2F',
          Dorado500: '#DCBB50',
          Cyan500: '#3AA1A2',
          Rojo400: '#D55958',
          Azul400: '#415185',
          Plomo400: '#525969',
          Hierro400: '#766D6F',
          Azul300: '#717CA3',
          Azul200: '#A0A8C2',
          Azul150: '#B8BED1',
          Rojo300: '#E08382',
          Rojo200: '#EAACAB',
          Rojo150: '#EFC1C0',
          Azul100: '#D0D3E0',
          Azul050: '#E7E9F0',
          Cajas: '#ECEEF3',
        },
        light: {
          primary: '#9E9E9E',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          Azul500: '#122566',
          Rojo500: '#CB302E',
          Plomo500: '#273043',
          Hierro500: '#54494B',
          Blanco500: '#F2F2F2',
          Negro500: '#2F2F2F',
          Dorado500: '#DCBB50',
          Cyan500: '#3AA1A2',
          Rojo400: '#D55958',
          Azul400: '#415185',
          Plomo400: '#525969',
          Hierro400: '#766D6F',
          Azul300: '#717CA3',
          Azul200: '#A0A8C2',
          Azul150: '#B8BED1',
          Rojo300: '#E08382',
          Rojo200: '#EAACAB',
          Rojo150: '#EFC1C0',
          Azul100: '#D0D3E0',
          Azul050: '#E7E9F0',
          Cajas: '#ECEEF3',
        },
        fontFamily: 'Poppins',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      // Add the Webpack configuration here
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-optional-chaining"]
          }
        }
      });
    }
  }
}
