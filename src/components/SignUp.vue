<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Sign up to Food4Me</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field label="E-mail" v-model="email" v-bind:rules="emailRules" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="Password"
          v-model="password"
          v-bind:rules="passwordRules"
          v-bind:type="'password'"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="Password again"
          v-model="password2"
          v-bind:rules="passwordRules2"
          v-bind:type="'password'"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary" v-on:click="signUp">SignUp</v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar :timeout="6000" :top="true" v-model="showAlert">
      {{ signUpError }}
      <v-btn text color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showAlert: false,
      message: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
          || "E-mail must be valid"
      ],
      password: "",
      password2: "",
      passwordRules: [v => !!v || "Password is required"],
      passwordRules2: [
        v => !!v || "Password is required",
        v => {
          if (this.password !== v) {
            return "Passwords must be same";
          }
          return true;
        }
      ]
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    signUpError() {
      return this.$store.getters.signUpError;
    }
  },
  methods: {
    signUp: function() {
      const vm = this;
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signUpUser", payload).then(() => {
        if (vm.isLoggedIn) {
          this.$router.push({ path: "/" });
        } else {
          vm.showAlert = true;
        }
      });
    },
    cancel: function() {
      this.$router.push({ path: "/" });
      console.log("The user does not want to Sign Up!");
    }
  }
};
</script>

<style>
</style>
