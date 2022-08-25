<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col align-self-center">
        <b-card
          style="max-width: 20rem"
          id="Login"
          border-variant="primary"
          header="Login"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-form-input
            id="username"
            v-model="form.username"
            required
            placeholder="Enter username"
            type="text"
          >
          </b-form-input>
          <b-form-input
            class="mt-2"
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password"
          >
          </b-form-input>
          <div class="mt-2">
            <b-button variant="primary" @click="login()">Login</b-button>
            <b-button variant="danger" @click="onReset" class="m1-2"
              >Reset</b-button
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      console.log(this.form);
    },
    onReset() {
      this.form = {
        user: "",
        password: "",
      };
    },
  },
};
</script>

<style>
</style>