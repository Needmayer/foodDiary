<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isLoggedIn"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="home">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="foodDiary">
          <v-list-tile-action>
            <v-icon>chrome_reader_mode</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Food diary</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="recipes">
          <v-list-tile-action>
            <v-icon>library_books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Recipes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="shopList">
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Shop list</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="weeklyMenu">
          <v-list-tile-action>
            <v-icon>restaurant_menu</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Weekly menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Food4Me</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!isLoggedIn" class="hidden-sm-and-down">
        <v-btn @click="login" flat>Login</v-btn>
        <v-btn @click="signUp" flat>Sign Up</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn @click="logout" flat>Logout</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
    </v-content>
     <v-snackbar
      :timeout="6000"
      :top="true"
      v-model="showAlert"
    >
      {{ logoutError }}
      <v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    showAlert: false,
  }),
  props: {
    source: String
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    logoutError () {
      return this.$store.getters.logoutError
    }
  },
  methods: {
    login: function () {
      this.$router.push({ path: '/login' })
    },
    signUp: function () {
      this.$router.push({ path: '/signup' })
    },
    logout: function () {
      this.$store.dispatch('logOutUser')
    },
    foodDiary: function () {
      this.$router.push({ path: '/food-diary' })
    },
    recipes: function () {
      this.$router.push({ path: '/recipes' })
    },
    weeklyMenu: function () {
      this.$router.push({ path: '/weekly-menu' })
    },
    shopList: function () {
      this.$router.push({ path: '/shop-list' })
    },
    home: function () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
