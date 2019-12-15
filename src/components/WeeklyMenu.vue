<template>
  <div>
    <h2>Menu</h2>
    <v-btn text right @click.stop="generateMenu"><v-icon>add</v-icon>Generate new menu</v-btn>
    <v-container
      class="grey lighten-5"
    >
      <v-row no-gutters>
        <v-col
          v-for="tag of tags"
          :key="tag"
          :cols="tags.lenght"
        >
          <v-card
            class="pa-1 display-1"
            outlined
            tile
            height="100%"
          >
             {{ tag }}
          </v-card>
        </v-col>
      </v-row>
      <v-row
        v-for="(i, index) in menu['breakfast']"
        :key="index"
        no-gutters
      >
        <v-col
          v-for="n in Object.keys(menu)"
          :key="n"
          :cols="Object.keys(menu).lenght"
        >
          <v-card
            class="pa-2"
            outlined
            tile
            height="100%"
          >
            {{menu[n][index].title}}
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>

</template>

<script>
export default {
  data: () => ({
  }),
  created: function() {
    this.getRecipes();
  },
  methods: {
    getRecipes: function() {
      if (this.$store.getters.recipes.length === 0
        || this.$store.getters.recipes[0].title === undefined) {
        this.$store.dispatch("getRecipes").then((resp) => {
          if (Object.keys(this.$store.getters.menu).length === 0
          || this.$store.getters.menu.breakfast[0].title === undefined) {
            this.$store.dispatch("getWeeklyMenu");
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        if (Object.keys(this.$store.getters.menu).length === 0
          || this.$store.getters.menu.breakfast[0].title === undefined) {
          this.$store.dispatch("getWeeklyMenu");
        }
      }
    },
    generateMenu: function() {
      this.$store.dispatch("generateMenu");
    }
  },
  computed: {
    menu() {
      return this.$store.getters.menu;
    },
    tags() {
      return this.$store.getters.tags;
    }
  }
};
</script>

<style>
</style>
