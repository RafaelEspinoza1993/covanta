<template>
  <div>
    <login />
    <b-modal id="singUp" size="xl">
      <singUp />
    </b-modal>
    <b-modal id="forgotPassword" size="xl">
      <forgotPassword />
    </b-modal>
  </div>
</template>

<script>
import login from "@/components/loginComponents/loginComponent.vue";
import singUp from "@/components/loginComponents/singUpComponent.vue";
import forgotPassword from "@/components/loginComponents/forgotPasswordComponent.vue";
export default {
  components: {
    login,
    singUp,
    forgotPassword,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
#login {
}
</style>