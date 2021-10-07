<template>
  <div id="login">
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="form" @submit.prevent="login()">
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="email" class="text-info">Email:</label><br>
                <input type="email" v-model="username" required name="username" id="username" placeholder="Enter email"
                       class="form-control">
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label><br>
                <input type="password" v-model="password" required name="password" id="password"
                       placeholder="Enter password"
                       class="form-control">
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "index",
  data: () => ({
    username: 'lemonpatwari@gmail.com',
    password: '12345678',
  }),
  methods: {

    ...mapActions({
      userLogin: "login/userLogin"
    }),

    ...mapMutations({
      setUser: 'login/setUser',
      setToken: 'login/setToken'
    }),

    login() {

      this.userLogin({
        username: this.username,
        password: this.password,
      }).then((res) => {

        this.setUser();
        this.setToken();

        this.$router.push('/');
      })

    },


  },
}
</script>

<style scoped>
#login-column {
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}
</style>
