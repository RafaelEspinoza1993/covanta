<template>
  <div>
    <img src="@/assets/login/logo.svg" alt="" class="mb-2" />
    <hr class="hrNavbarLogin mb-5" />
    <p class="pNavbarLogin">
      Sustainable Materials Management to Protect Tomorrow.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#login {
  .navbar {
    background: linear-gradient(180deg, rgba(161, 220, 164, 0.42) 0%, rgba(91, 152, 94, 0.88) 100%),url("@/assets/login/backgroundlogin.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .hrNavbarLogin {
      border: 1px solid #ffffff;
    }
    .pNavbarLogin {
      font-weight: 700;
      font-size: 20px;
      line-height: 120px;

      color: #ffffff;
    }
  }
}
</style>