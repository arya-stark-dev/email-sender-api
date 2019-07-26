<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" id="horizontal-navbar">
    <a class="navbar-brand" href="#">EMAIL SENDER</a>
    <button
      class="navbar-toggler"
      type="button" data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">HOME <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" v-if="token">
          <a class="nav-link" @click="logOutUser">LOGOUT</a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link" @click="goToLogin">LOGIN</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation-bar',
  data() {
    return {};
  },
  methods: {
    async logOutUser() {
      await this.$store.dispatch('updateUserToken', '');
      this.$router.push('/public/login');
    },
    goToLogin() {
      this.$router.push('/public/login');
    },
  },
  computed: {
    token() {
      return this.$store.getters.getUserToken;
    },
  },
};
</script>

<style lang="scss" scoped>
#horizontal-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid $grey-mid;
  width: 100%;
  box-shadow: 0 -2px 6px 0 $black-vnc;
  z-index: 99;
}
.navbar {
  background-color: $off-white;
}

// .left-navigation {
//   margin-left: 100px;
// }

// .right-navigation {
//   align-items: center;
//   display: flex;
//   justify-content: space-between;
//   padding-right: 20px;
// }

.image-div {
  position: absolute;
  width: 70px;
  height: 60px;
  top: 10px;
  left: 10px;
}

.menu-bar {
  padding-left: 10px;
  justify-content: flex-start;
}

.logo-image {
  justify-content: center;
  align-self: center;
  width: 50px;
  height: 40px;
}

.login-holder {
  padding-right: 10px;
}

.nav-link-text {
  padding: 10px 20px;
  border: 1px solid $green;
  border-radius: 4px;
  width: 150px;
  display: inline-block;
  color: $green;
  text-align: center;
}
a {
  text-decoration: none;
  color: $green;
  cursor: pointer;
}

.login-link {
  padding-left: 20px;
}
</style>
