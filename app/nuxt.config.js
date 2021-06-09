require("dotenv").config() //一番上に
const client = require("./plugins/contentful")

module.exports = {

  css:[
    '@/assets/css/common.css',
  ],

  server: {
    port: 9000,
    host: '0.0.0.0'
  },

  plugins: [
    '~/plugins/contentful'
  ],
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    html: true,
    linkify: true,
    typography: true,
  },
  generate: {
    routes() {
      return client
        .getEntries({ content_type: 'post' })
        .then(entries => {
          return entries.items.map(entry => {
            return {
              route: "/posts/" + entry.fields.slug,
              payload: entry
            }
          })
        })
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Tech-Memorandam',
    titleTemplate:'%s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is mainly a summary of what I have learned about the web. I am Japanese, so please forgive me if there are some poor sentences.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', size:'196x196', href:'/favicon.ico'},
      { rel: 'apple-touch-icon', href:'/favicon.ico'},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

