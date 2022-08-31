<template>
  <div id="app">
    <div class="container-fluid" v-if="Object.keys(user).length === 0">
      <div class="row" id="login">
        <div class="col-6 navbar">
          <NavBarLoginComponents />
        </div>
        <div class="col-6 login">
          <router-view />
        </div>
      </div>
    </div>
    <div id="Dashboard" class="container-fluid" v-else>
      <div class="row containerWeb">
        <sidebar-menu :menu="menu" @toggle-collapse="onToggleCollapse">
          <div slot="header">
            <img
              src="@/assets/login/logo.svg"
              alt=""
              class="mb-2 logo"
              v-if="logo"
            />
            <div class="logo" v-else>
              <i class="fa fa-home"></i>
            </div>
          </div>
          <i :class="buttonNav" aria-hidden="true" slot="toggle-icon"></i>
        </sidebar-menu>
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
          href: "/",
          title: "Search",
          icon: "lupa",
        },
        {
          href: "/Facilities",
          title: "Facilities",
          icon: "fabrica",
        },
        {
          href: "/Assumptions",
          title: "Assumptions",
          icon: "assumptions",
        },
        {
          href: "/HistoricDeals",
          title: "Historic deals",
          icon: "Historicdeals",
        },
      ],
      buttonNav: "fa fa-plus",
      logo: true,
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
      Object.keys(this.user).length === 0
        ? this.$router.push("/login")
        : this.$router.push("/");
    },
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.logo = !collapsed;
      this.buttonNav = !collapsed ? "fa fa-plus" : "fa fa-minus";
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
  input,
  select {
    border-radius: 0;
    border: 2px solid #e0e0e0;
  }
  .btn-primary {
    background: #1f569f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0;
  }
  .vsm--header {
    background: url("@/assets/login/logo.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 12vh;
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

.containerWeb {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 0;
    background: #f3f2f5;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
.v-sidebar-menu .vsm--link_hover,
.v-sidebar-menu .vsm--link:hover {
  background-color: #01492c;
}

a.router-link-exact-active.router-link-active.vsm--link.vsm--link_level-1.vsm--link_active.vsm--link_exact-active {
  box-shadow: 3px 0px 0px 0px #ffffff inset;
}

.v-sidebar-menu.vsm_expanded,
.v-sidebar-menu.vsm_collapsed {
  position: relative;
  height: 100vh;
  padding: 0;
  background: linear-gradient(180deg, #045333 0%, #4b854e 100%);
}

.v-sidebar-menu.vsm_expanded {
  width: 14%;
  .logo {
    width: 100%;
    background: #01492c;
    padding: 2rem;
  }
}
button.vsm--toggle-btn.vsm--toggle-btn_slot {
  background: #01492c;
}

.fa-home:before {
  color: #ffffff;
}

.v-sidebar-menu.vsm_collapsed {
  .logo {
    width: 100%;
    background: #01492c;
    padding: 1rem;
  }
}
.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
  display: flex;
  justify-content: center;
  background-color: transparent !important;
}
.v-sidebar-menu {
  .lupa:before {
    content: url("@/assets/icons/lupa.svg");
  }
  .fabrica:before {
    content: url("@/assets/icons/fabrica.svg");
  }
  .assumptions:before {
    content: url("@/assets/icons/assumptions.svg");
  }
  .Historicdeals:before {
    content: url("@/assets/icons/Historicdeals.svg");
  }
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
