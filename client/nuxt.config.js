require("dotenv").config();
import axios from "axios";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/transitions.scss", "~/assets/scss/global.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/axios"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/dotenv", "@nuxtjs/axios"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/auth"],
  /*
   ** Build configuration
   */
  server: { port: 3311 },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.devtool = "source-map";
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post", propertyName: "token" },
          logout: false,
          user: false,
        },
      },
    },
  },

  axios: {
    baseURL: process.env.API_URL,
  },

  generate: {
    routes() {
      return axios.get(process.env.API_URL + "/count").then(res => {
        let count = res.data.count;
        return [...Array(count - 1).keys()].map(item => "/comic/" + (item + 1));
      });
    },
  },
};
