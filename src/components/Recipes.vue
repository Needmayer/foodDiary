<template>
  <v-container>
    <v-btn text right @click.stop="addNew"><v-icon>add</v-icon> Přidat</v-btn>
    <recipe-dialog
      ref="createDialog"
    ></recipe-dialog>
    <recipe-dialog
      ref="editDialog"
    ></recipe-dialog>
    <v-row>
    <recipe
      v-for="recipe in recipes"
      v-bind:key="recipe._id"
      v-bind:recipe="recipe"
      @click.native="edit(recipe)"
    >
      {{recipe.title}}
    </recipe>
    </v-row>
  </v-container>
</template>

<script>
import recipeDialog from "./recipeDialog";
import Recipe from "./Recipe";

export default {
  data: () => ({
    dialog: false
  }),
  created: function() {
    this.getRecipes();
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    }
  },
  methods: {
    getRecipes: function() {
      if (this.$store.getters.recipes[0] === undefined
        || this.$store.getters.recipes[0].title === undefined
      ) {
        this.$store.dispatch("getRecipes");
      }
    },
    addNew: function() {
      this.$refs.createDialog.showD(true);
    },
    edit: function(recipe) {
      console.log(recipe);
      this.$refs.editDialog.showD(true);
      this.$refs.editDialog.setData(recipe);
    }
  },
  components: {
    recipeDialog,
    Recipe
  }
};
</script>

<style>
</style>
