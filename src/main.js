// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App";
import router from "./router";
import axios from "axios";

// Vuex store
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuetify);

// Setup axios to be available globally through Vue
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: `https://food4me.herokuapp.com:${process.env.PORT || 3000}/api`,
  withCredentials: true
});

store.dispatch("isLogged");

// redirect to login page if not logged
// router.beforeEach((to, from, next) => {
//   if (!store.getters.isLoggedIn) {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

/* eslint-disable no-new */
new Vue({
  store,
  router,
  vuetify: new Vuetify({icons: {
    iconfont: "mdi" // default - only for display purposes
  }}),
  render: h => h(App)
}).$mount("#app");
