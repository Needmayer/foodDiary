import Vue from "vue";

const state = {
  saveRecipeSuccess: "",
  saveRecipeError: "",
  tags: ["breakfast", "first snack", "lunch", "second snack", "dinner", "second dinner"]
};

const actions = {
  async saveRecipe({ commit }, payload) {
    await Vue.axios.post("/user/recipe", payload)
      .then((resp) => {
        commit("saveRecipeSuccess");
        commit("addRecipe", payload);
      }).catch((err) => {
        commit("saveRecipeError", err.response.data.error);
      });
  },
  async editRecipe({ commit }, payload) {
    console.log("edit");
    await Vue.axios.put("/user/recipe", payload, { crossdomain: true })
      .then((resp) => {
        commit("saveRecipeSuccess");
        commit("updateRecipe", payload);
      }).catch((err) => {
        console.log(err);
        commit("saveRecipeError", err.response.data.error);
      });
  }
};

const mutations = {
  saveRecipeError(state, errorMessage) {
    state.saveRecipeSuccess = "";
    state.saveRecipeError = errorMessage;
  },
  saveRecipeSuccess(state) {
    state.saveRecipeError = "";
    state.saveRecipeSuccess = "Recipe successfully saved";
  }
};

const getters = {
  saveRecipeError: state => state.saveRecipeError,
  saveRecipeSuccess: state => state.saveRecipeSuccess,
  tags: state => state.tags
};

export default {
  state,
  actions,
  getters,
  mutations
};
