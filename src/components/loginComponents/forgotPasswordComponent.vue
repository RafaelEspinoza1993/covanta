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

    <div class="forgotPassword" v-if="!endResetPass">
      <h3 class="title mb-4">Reset your password</h3>
      <label class="subtitle mb-5"
        >Enter your email and we'll send you instructions on how to reset your
        password.</label
      >
      <b-form>
        <b-form-input
          v-model="form.email"
          required
          placeholder="Username@mail.com"
          type="email"
          class="mb-5"
        >
        </b-form-input>
      </b-form>
      <div class="text-right">
        <b-button variant="primary" @click="sendForm(form)">send</b-button>
      </div>
    </div>
    <div class="forgotPassword" v-else>
      <p class="titleEndReset">
        We’ve sent you an email which you can use to change your password. Check
        your spam folder if you haven’t received it after few minutes.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: null,
      },
      endResetPass: false,
    };
  },
  methods: {
    sendForm() {
      this.endResetPass = true;
      //this.closeModal();
    },
    closeModal() {
      this.$bvModal.hide("forgotPassword");
    },
  },
};
</script>
<style lang="scss">
#forgotPassword {
  .titleEndReset {
    max-width: 607px;
    font-weight: 700;
    font-size: 18px;
    color: #1f569f;
  }
  .btn-primary {
    background: #1f569f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0;
  }
  input {
    border-radius: 0;
    border: 2px solid #e0e0e0;
  }
  header#forgotPassword___BV_modal_header_,
  footer#forgotPassword___BV_modal_footer_ {
    display: none;
  }
  div#forgotPassword___BV_modal_content_ {
    height: 80vh;
  }
  div#forgotPassword___BV_modal_body_ {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    color: #171717;
  }
  .subtitle {
    font-weight: 600;
    font-size: 14px;
    color: #bdbdbd;
  }
  .close {
    position: absolute;
    top: 1em;
    right: 1em;
  }
}
</style>