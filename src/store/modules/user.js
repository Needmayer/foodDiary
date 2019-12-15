import Vue from "vue";

const state = {
  email: "",
  userId: null,
  isLoggedIn: false,
  loginError: "",
  recipes: [],
  menu: {},
  ingredients: []
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  email: state => state.email,
  recipes: state => state.recipes,
  menu: state => state.menu,
  ingredients: state => state.ingredients,
  loginError: state => state.loginError,
  signUpError: state => state.signUpError
};

const actions = {
  async isLogged({ commit }) {
    await Vue.axios.get("/login", { withCredentials: true, crossdomain: true })
      .then((resp) => {
        let data = resp.data;
        if (data && data._id && data._id.length > 0) {
          const userInfo = {
            userId: data._id,
            email: data.email,
            menu: data.menu,
            recipes: data.recipes
          };
          commit("logInUser", userInfo);
        }
      });
  },
  async logInUser({ commit }, payload) {
    await Vue.axios.post("/login", payload)
      .then((resp) => {
        let data = resp.data;
        if (data && data._id.length > 0) {
          payload.userId = data._id;
          commit("logInUser", payload);
        }
      })
      .catch(() => {
        commit("loginError");
      });
  },

  async logOutUser({ commit }) {
    await Vue.axios.post("/logout")
      .then((resp) => {
        if (resp.status === 200) {
          commit("logOutUser");
        }
      })
      .catch(() => {
        commit("logoutError");
      });
  },

  async signUpUser({ commit }, payload) {
    await Vue.axios.post("/user", payload)
      .then((resp) => {
        commit("logInUser", payload);
      }).catch(() => {
        commit("signUpError");
      });
  },
  async getRecipes({commit}) {
    await Vue.axios.get("/user/recipes")
      .then((resp) => {
        commit("setRecipies", resp.data);
      })
      .catch((err) => {
        console.log("response ", err);
        // commit("getRecipiesError");
      });
  },
  async getWeeklyMenu({ commit }, payload) {
    await Vue.axios.get("/user/getMenu", payload)
      .then((resp) => {
        console.log("resp.data", resp.data);
        commit("saveMenu", resp.data.menu);
      }).catch((err) => {
        console.log("err", err);
      });
  },
  async generateMenu({ commit }, payload) {
    await Vue.axios.get("/user/generateMenu", payload)
      .then((resp) => {
        commit("saveMenu", resp.data);
      }).catch((err) => {
        console.log("err", err);
      });
  },
  async getShopList({commit}) {
    await Vue.axios.get("/user/getShopList")
      .then((resp) => {
        commit("shopList", resp.data);
      })
      .catch((err) => {
        console.log("response ", err);
        // commit("getRecipiesError");
      });
  }
};

const mutations = {
  logInUser(state, payload) {
    state.isLoggedIn = true;
    state.email = payload.email;
    state.userId = payload.userId;
    state.recipes = payload.recipes || [];
    if (payload.menu) {
      console.log("login");
      state.menu = generateMenu(payload.menu);
    } else {
      state.menu = {};
    }
  },
  loginError(state) {
    state.isLoggedIn = false;
    state.loginError = "Email and/or Password are invalid. Login failed.";
  },
  signUpError(state) {
    state.isLoggedIn = false;
    state.signUpError = "Sign Up failed.";
  },
  logOutUser(state) {
    state.isLoggedIn = false;
    state.email = "";
    state.userId = "";
    state.recipes = [];
    state.menu = [];
  },
  logoutError(state) {
    state.logoutError = "Logout failed.";
  },
  setRecipies(state, payload) {
    state.recipes = payload;
  },
  updateRecipe(state, payload) {
    let recipes = state.recipes;
    for (const [index, recipe] of recipes.entries()) {
      if (recipe._id === payload._id) {
        state.recipes[index] = payload;
      }
    }
  },
  addRecipe(state, payload) {
    state.recipes.push(payload);
  },
  saveMenu(state, menu) {
    state.menu = generateMenu(menu);
  },
  shopList(state, ingredients) {
    let list = generateShopList(ingredients);
    state.ingredients = list;
  }
};

function generateMenu(menuWithIds) {
  console.log(menuWithIds);
  for (const foodType in menuWithIds) {
    for (const [index, id] of menuWithIds[foodType].entries()) {
      let recipe = findRecipe(id);
      if (recipe instanceof Object) {
        menuWithIds[foodType][index] = recipe;
      }
    }
  }
  return menuWithIds;
}

function findRecipe(id) {
  let recipes = state.recipes;
  for (const recipeObj of recipes) {
    if (id === recipeObj._id) {
      return recipeObj;
    }
  }
  return false;
}

function generateShopList(recipesList) {
  let ingredients = [];
  for (const [id, value] of Object.entries(recipesList)) {
    let recipe = findRecipe(id);
    if (recipe instanceof Object) {
      for (const ingredientObj of recipe.ingrediences) {
        let setIngredient = ingredients.filter(ingredient => (ingredient.name === ingredientObj.ingredience));
        console.log("filter", setIngredient);
        if (ingredientObj.ingredience !== undefined && setIngredient.length > 0) {
          // && ingrediances[ingredianceObj.ingredience].unit === ingredianceObj.unit)
          setIngredient[0] = {
            "name": ingredientObj.ingredience,
            "amount": setIngredient[0].amount + ingredientObj.amount * value,
            "unit": ingredientObj.unit
          };
        } else if (ingredientObj.ingredience !== undefined) {
          ingredients.push({
            "name": ingredientObj.ingredience,
            "amount": ingredientObj.amount * value,
            "unit": ingredientObj.unit
          });
        }
      }
    } else {
      console.log("not found", id);
    }
  }
  return ingredients;
}

export default {
  state,
  getters,
  actions,
  mutations
};
