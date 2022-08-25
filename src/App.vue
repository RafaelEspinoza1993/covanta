<template>
  <div id="app">
    <div class="container-fluid" v-show="Object.keys(user).length !== 0">
      <div class="row">
        <div :class="navCSS">
          <sidebar-menu :menu="menu" @toggle-collapse="onToggleCollapse" />
        </div>
        <div :class="headerCSS" id="Header">
          <HeaderComponents />
        </div>
        <div :class="contentCSS" id="Content">
          <router-view />
        </div>
      </div>
    </div>
    <div v-show="Object.keys(user).length === 0">
      <LoginView />
    </div>
  </div>
</template>
<script>
import HeaderComponents from "@/components/globalComponents/HeaderComponents.vue";
import LoginView from "@/views/LoginView.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    HeaderComponents,
    LoginView,
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
      contentCSS:
        "col-12 animate__animated animate__slideInRight animate_timer_content col-10-edit-open",
      navCSS: "",
      headerCSS: "col-12 col-12-edit-open",
    };
  },
  computed: {
    ...mapGetters("login", ["user", "isLoadingLogin"]),
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.contentCSS = collapsed
        ? "col-12 animate__animated animate__slideInLeft animate_timer_content col-12-edit-close"
        : "col-12 animate__animated animate__slideInRight animate_timer_content col-12-edit-open";
      this.headerCSS = collapsed
        ? "col-12 col-12-edit-close"
        : "col-12 col-12-edit-open";
    },
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
.v-sidebar-menu.vsm_expanded {
  width: 8.33333333%;
}
.v-sidebar-menu.vsm_collapsed {
}
#Header.col-12-edit-open {
  padding-left: 8.33333333%;
}
#Header.col-12-edit-close {
  padding-left: 2.63%;
}
#Content.col-12-edit-close {
  padding-left: 55px;
}
#Content.col-12-edit-open {
  padding-left: 8.33333333%;
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
