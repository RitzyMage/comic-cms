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
  css: ["~/assets/scss/transitions.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/axios", "~/plugins/toast"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/dotenv", "@nuxtjs/axios"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/auth-next", "@nuxt/content"],
  /*
   ** Build configuration
   */
  server: { port: 3311 },

  target: "static",

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
    async routes() {
      const [comicsCount, tags] = await Promise.all([
        axios.get(process.env.API_URL + "/comic/count"),
        axios.get(process.env.API_URL + "/tags"),
      ]);
      let count = comicsCount.data.count;
      let comicsRoutes = [...Array(count - 1).keys()].map(item => "/comic/" + (item + 1));
      let tagsRoutes = tags.data.map(tag => `/tag/${tag}`);
      return [...comicsRoutes, ...tagsRoutes];
    },
  },
};
