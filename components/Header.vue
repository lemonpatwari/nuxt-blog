<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Logo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="text-red" to="/" v-for="(n,index) in 5">Menu {{ n }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item to="/login" v-if="!isAuthenticated">Login</b-nav-item>

          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ userinfo.name }}</em>
            </template>
            <b-dropdown-item href="javaScript::void(0)" @click="logOut">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      token: 'login/getToken',
      user: 'login/getUser'
    }),

    userinfo() {
      return this.user
    },
    isAuthenticated() {
      return this.token ? true : false;
    }
  },
  methods: {
    ...mapMutations({
      setUser: 'login/setUser',
      setToken: "login/setToken"
    }),
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setToken();
      this.setUser();
      this.$router.push('/')
    }
  },
  mounted() {
    this.setUser();
    this.setToken();
  }
}
</script>

<style scoped>

</style>
