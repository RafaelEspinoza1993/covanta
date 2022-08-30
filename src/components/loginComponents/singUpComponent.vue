<template>
  <div>
    <button
      type="button"
      aria-label="Close"
      class="close"
      @click="closeModal()"
    >
      ×
    </button>

    <div class="singUp">
      <h3 class="title mb-4">Create your account</h3>
      <b-form>
        <b-form-input
          v-model="form.email"
          required
          placeholder="Username@mail.com"
          type="email"
          class="mb-4"
        >
        </b-form-input>
        <b-form-input
          type="password"
          v-model="form.password"
          required
          placeholder="Password"
          class="mb-4"
        >
        </b-form-input>
      </b-form>
      <ul class="listPassRules">
        <li>A minimum of 10 characters</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
        <li>At least one uppcase letter</li>
      </ul>
      <div class="text-right">
        <b-button variant="primary" @click="sendForm(form)">Create</b-button>
      </div>
      <p class="text-left singInAccountTitle">
        Have an account?
        <span class="singInAccount" @click="closeModal()">Sing in</span>
      </p>
    </div>
  </div>
</template>
  <script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: null,
      },
    };
  },
  methods: {
    ...mapActions("login", ["CreateUser"]),
    async sendForm(payload) {
      await this.CreateUser(payload);
      if (this.create !== 401) {
        this.closeModal();
      } else {
        alert("Datos incorrectos");
      }
    },
    closeModal() {
      this.$bvModal.hide("singUp");
    },
  },
};
</script>
  <style lang="scss">
#singUp {
  .btn-primary {
    background: #1f569f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0;
  }
  input {
    border-radius: 0;
    border: 2px solid #e0e0e0;
  }
  header#singUp___BV_modal_header_,
  footer#singUp___BV_modal_footer_ {
    display: none;
  }
  div#singUp___BV_modal_content_ {
    height: 80vh;
  }
  div#singUp___BV_modal_body_ {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    color: #171717;
  }
  .close {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  .listPassRules {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 2rem;
    font-weight: 600;
    font-size: 14px;

    color: #bdbdbd;
  }
  .singInAccount {
    color: var(--bs-link-color);
    text-decoration: underline;
  }
  .singInAccountTitle {
    font-weight: 600;
    font-size: 14px;
    color: #171717;
  }
  form {
    width: 85%;
    margin: 0 auto;
  }
}
</style>