<template>
  <div id="app">
    <div
      id="Dashboard"
      class="container-fluid"
      v-show="Object.keys(user).length !== 0"
    >
      <div class="row">
        <sidebar-menu :menu="menu"/>
        <main id="main">
          <div  id="Header">
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
    <div v-show="Object.keys(user).length === 0" id="login">
      <NavBarLoginComponents />
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderComponents from "@/components/globalComponents/HeaderComponents.vue";
import NavBarLoginComponents from "@/components/loginComponents/navbarComponent.vue";
import { mapGetters, mapActions } from "vuex";
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
    this.getRoutes();
    this.CheckLogin();
  },
  computed: {
    ...mapGetters("login", ["user", "isLoadingLogin"]),
  },
  methods: {
    ...mapActions("login", ["getRoutes"]),
    CheckLogin(){
      Object.keys(this.user).length === 0 ? this.$router.push('/login') : this.$router.push('/')
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
