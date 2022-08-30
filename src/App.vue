<template>
  <div id="app">
    <div
      id="Dashboard"
      class="container-fluid"
      v-show="Object.keys(user).length !== 0"
    >
      <div class="row">
        <sidebar-menu :menu="menu" />
        <main id="main">
          <div id="Header">
            <HeaderComponents />
          </div>
          <div class="col-12" id="Views">
            <div class="container">
              <div class="row"><router-view /></div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="container-fluid" v-show="Object.keys(user).length === 0">
      <div class="row" id="login">
        <div class="col-6 navbar">
          <NavBarLoginComponents />
        </div>
        <div class="col-6 login">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderComponents from "@/components/globalComponents/HeaderComponents.vue";
import NavBarLoginComponents from "@/components/loginComponents/navbarComponent.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    HeaderComponents,
    NavBarLoginComponents,
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true,
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user",
        },
      ],
    };
  },
  mounted() {
    this.checkUser();
  },
  computed: {
    ...mapGetters("login", ["user", "isLoadingLogin"]),
  },
  methods: {
    checkUser() {
      Object.keys(this.user).length === 0 ? this.$router.push("/login") : this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Helvetica";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  input {
    border-radius: 0;
    border: 2px solid #e0e0e0;
  }
  .btn-primary {
    background: #1f569f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0;
  }
}

#login {
  height: 100vh;
  .navbar,
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .btn-primary {
    background: #1f569f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0;
  }
}

.row {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 0;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}

.v-sidebar-menu.vsm_expanded,
.v-sidebar-menu.vsm_collapsed {
  position: relative;
  height: 100vh;
  padding: 0;
}

.v-sidebar-menu.vsm_expanded {
  width: 8.33333333%;
}

.v-sidebar-menu.vsm_collapsed {
}

.animate__animated.animate__slideInLeft,
.animate__animated.animate__slideInRight {
  --animate-duration: 1.8s;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
