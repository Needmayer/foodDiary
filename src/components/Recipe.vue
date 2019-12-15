<template>
  <v-card
     class="mx-auto text-left ma-2"
     max-width="344"
     min-width="344"
     shaped
  >
    <v-list-item three-line >
      <v-list-item-content >
        <v-list-item-title left class="headline mb-1">{{recipe.title}}</v-list-item-title>
        <v-list-item-subtitle>{{recipe.description}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>
      <v-chip
        v-for="tag of recipe.tags"
        v-bind:key="tag"
        class="ma-1"
      >
        {{tag}}
      </v-chip>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-timer</v-icon> {{recipe.timeConsume}}
      </v-list-item-icon>
      <v-list-item-icon>
        <v-icon>mdi-fire</v-icon> {{recipe.energy}}{{recipe.energyUnit}}
      </v-list-item-icon>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  name: "Recipe",
  props: ["recipe"]
};
</script>
