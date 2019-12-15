<template>
  <v-app id="app">
    <router-view/>
    <v-navigation-drawer
    v-if="isLoggedIn"
    v-model="drawer"
    :clipped-left="clipped" flat
    app>
      <v-list dense>
        <v-list-item @click="home">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="foodDiary">
          <v-list-item-action>
            <v-icon>chrome_reader_mode</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Food diary</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="recipes">
          <v-list-item-action>
            <v-icon>library_books</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Recipes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="shopList">
          <v-list-item-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Shop list</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="weeklyMenu">
          <v-list-item-action>
            <v-icon>restaurant_menu</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Weekly menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Food4Me</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!isLoggedIn" class="hidden-sm-and-down">
        <v-btn @click="login" text>Login</v-btn>
        <v-btn @click="signUp" text>Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn text>
          <v-icon color="white">person</v-icon>
          {{ email }}
        </v-btn>
        <v-btn @click="logout" text>
          <v-icon color="white">power_settings_new</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content></v-content>
    <v-snackbar :timeout="6000" :top="true" v-model="showAlert">
      {{ logoutError }}
      <v-btn text color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    showAlert: false
  }),
  props: {
    source: String
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    logoutError() {
      return this.$store.getters.logoutError;
    },
    email() {
      return this.$store.getters.email;
    }
  },
  methods: {
    login: function() {
      this.$router.push({ path: "/login" });
    },
    signUp: function() {
      this.$router.push({ path: "/signup" });
    },
    logout: function() {
      this.$store.dispatch("logOutUser");
      this.$router.push({ path: "/login" });
    },
    foodDiary: function() {
      this.$router.push({ path: "/food-diary" });
    },
    recipes: function() {
      this.$router.push({ path: "/recipes" });
    },
    weeklyMenu: function() {
      this.$router.push({ path: "/weekly-menu" });
    },
    shopList: function() {
      this.$router.push({ path: "/shop-list" });
    },
    home: function() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
@import "vuetify/dist/vuetify.min.css";
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
