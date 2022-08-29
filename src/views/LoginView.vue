<template>
  <div class="container">
    <div class="row">
      <div class="col">
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
            v-model="form.email"
            required
            placeholder="Enter username"
            type="email"
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
            <b-button variant="primary" @click="CheckLogin(form)">Login</b-button>
            <b-button variant="danger" @click="onReset" class="m1-2"
              >Reset</b-button
            >
            <p class="forgot-password text-right mt-2 mb-4">
              <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters("login", ["user", "isLoadingLogin"]),
  },
  methods: {
    ...mapActions("login", ["login", "CreateUser"]),
    CheckLogin(payload){
      this.login(payload);
      console.log(this.user);
      this.$router.replace({ path: '/' })
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
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>