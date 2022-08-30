<template>
  <div>
    <p class="h3 text-left mb-3">Login</p>
    <b-form>
      <b-form-input
        v-model="form.email"
        required
        placeholder="Username@mail.com"
        type="email"
        class="mb-5"
      >
      </b-form-input>
      <b-form-input
        type="password"
        v-model="form.password"
        required
        placeholder="Password"
        class="mb-3"
      >
      </b-form-input>
      <p class="forgot-password text-right mb-3" v-b-modal.forgotPassword>
        Forgot password ?
      </p>
      <b-form-radio
        class="text-left mb-4 remember"
        v-model="form.remember_me"
        name="remember_me"
        value="true"
        >Remember me</b-form-radio
      >
    </b-form>
    <p class="text-center mb-3">
      Don’t have an account?
      <span class="createAccount" v-b-modal.singUp>Create your account</span>
    </p>
    <div class="mt-2 text-right">
      <b-button variant="primary" @click="CheckLogin(form)">Login</b-button>
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
        remember_me: "",
      },
    };
  },
  computed: {
    ...mapGetters("login", ["user", "isLoadingLogin"]),
  },
  methods: {
    ...mapActions("login", ["login"]),
    async CheckLogin(payload) {
      await this.login(payload);
      if (this.user !== 401) {
        this.$router.replace({ path: "/" });
      }
    },
  },
};
</script>


<style lang="scss">
#login {
  input {
    border-radius: 0;
    border: 2px solid #e0e0e0;
  }
  .custom-radio .custom-control-label::before {
    border-radius: 0;
  }
  .forgot-password {
    color: #82888b !important;
    text-decoration: none;
  }
  .remember {
    display: flex;
    align-items: center;
    color: #82888b;
  }
  .createAccount {
    color: var(--bs-link-color);
    text-decoration: underline;
  }
}
</style>