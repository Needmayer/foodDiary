<template>
  <div>
    <h2>Shop list</h2>
    <v-card>
      <v-card-title
       max-width=500
      >
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        dense
        :headers="headers"
        :items="ingrediaceList"
        :items-per-page="15"
        :search="search"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Ingredient",
        align: "center",
        sortable: true,
        value: "name",
        filterable: true
      },
      {
        text: "Amount",
        align: "center",
        filterable: false,
        value: "amount"
      },
      {
        text: "Unit",
        align: "center",
        filterable: false,
        value: "unit"
      }
    ]
  }),
  mounted: function() {
    this.$store.dispatch("getShopList");
  },
  computed: {
    ingrediaceList() {
      console.log(this.$store.getters.ingredients);
      return this.$store.getters.ingredients;
    }
  },
  methods: {
    createShopList: function() {

    }
  }
};
</script>

<style>
</style>
