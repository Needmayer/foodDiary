<template>
  <div>
    <v-dialog v-model="showDialog" max-width="800px">
      <v-card>
        <v-card-title>
          <h2>New Receipt</h2>
        </v-card-title>
        <v-container grid-list-sm pa-12>
          <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="title"
                  :rules="[v => !!v || 'Title is required']"
                  label="Title"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  auto-grow
                  filled
                  color="deep-purple"
                  label="Description"
                  rows="1"
                ></v-textarea>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="timeConsume" label="Time consume"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="energy" label="Energy gain"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="energyUnit"
                  v-model="selectedEnergyUnit"
                  label="Energy unit"
                  >
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="selectedTags"
                  label="Tags"
                  :items="tags"
                  chips
                  multiple
                  hint="Pick type of food"
                  required
                ></v-select>
              </v-flex>
              <v-layout row wrap v-for="(item, index) in ingrediences" :key="item.index">
                <v-flex xs8>
                  <v-text-field
                    label="ingredience"
                    :value="item.ingredience"
                    @change="(event) => {changeItem(event, index, 'ingredience')}"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    label="Amount"
                    :value="item.amount"
                    @change="(event) => {changeItem(event, index, 'amount')}"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-select
                    :items="amountUnit"
                    label="Unit"
                    :value="item.unit"
                    @change="(event) => {changeItem(event, index, 'unit')}"
                  ></v-select>
                </v-flex>
              </v-layout>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="showDialog = false">Cancel</v-btn>
          <v-btn text @click="saveRecipe">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="4000"
      :top="true"
      color="error"
      v-model="showAlert"
    >
      {{ saveRecipeError }}
    </v-snackbar>
    <v-snackbar
      :timeout="4000"
      :top="true"
      color="success"
      v-model="showSuccess"
    >
      {{ saveRecipeSuccess }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "recipeDialog",
  data: () => ({
    showDialog: false,
    showAlert: false,
    showSuccess: false,
    valid: "",
    isEdit: false,
    title: "",
    description: "",
    timeConsume: "",
    energy: "",
    selectedEnergyUnit: "",
    energyUnit: ["Kj", "Cal"],
    amountUnit: ["g", "kg", "ml", "l", "cup"],
    selectedTags: [],
    photo: "",
    ingrediences: [{ ingredience: "", amount: "", unit: "" }]
  }),
  props: ["show"],
  computed: {
    saveRecipeError() {
      return this.$store.getters.saveRecipeError;
    },
    saveRecipeSuccess() {
      return this.$store.getters.saveRecipeSuccess;
    },
    tags() {
      return this.$store.getters.tags;
    }
  },
  methods: {
    saveRecipe: function() {
      const recipeInfo = {
        userId: this.$store.getters.userId,
        title: this.title,
        description: this.description,
        timeConsume: this.timeConsume,
        energy: this.energy,
        energyUnit: this.selectedEnergyUnit,
        ingrediences: this.ingrediences,
        tags: this.selectedTags,
        photo: this.photo,
        _id: this.edit
      };

      if (this.edit) {
        this.$store.dispatch("editRecipe", recipeInfo).then((resp) => {
          this.processSaveResponse();
        });
      } else {
        this.$store.dispatch("saveRecipe", recipeInfo).then((resp) => {
          this.processSaveResponse();
        });
      }
    },
    processSaveResponse() {
      if (this.saveRecipeError) {
        this.showAlert = true;
      } else {
        this.showSuccess = true;
        setTimeout(() => { this.showD(false); }, 500);
      }
    },
    showD(show) {
      this.showDialog = show;
    },
    setData(recipe) {
      this.edit = recipe._id;
      this.title = recipe.title ? recipe.title : this.title;
      this.description = recipe.description ? recipe.description : this.description;
      this.timeConsume = recipe.timeConsume ? recipe.timeConsume : this.timeConsume;
      this.energy = recipe.energy ? recipe.energy : this.energy;
      this.selectedEnergyUnit = recipe.energyUnit ? recipe.energyUnit : this.selectedEnergyUnit;
      this.selectedTags = recipe.tags ? recipe.tags : this.selectedTags;
      this.photo = recipe.photo ? recipe.photo : this.photo;
      this.ingrediences = recipe.ingrediences ? recipe.ingrediences : this.ingrediences;
    },
    changeItem: function(value, index, key) {
      this.ingrediences[index][key] = value;
      if (index === this.ingrediences.length - 1) {
        this.ingrediences.push({ ingredience: "", amount: "", unit: "" });
      } else {
        if (value === "") {
          let keys = Object.keys(this.ingrediences[index]);
          let empty = true;
          for (key in keys) {
            if (
              this.ingrediences[index][key] !== ""
              && this.ingrediences[index][key] !== undefined
            ) {
              empty = false;
              break;
            }
          }
          if (empty) {
            this.ingrediences.splice(index, 1);
          }
        }
      }
    }
  }
};
</script>

<style>
</style>
