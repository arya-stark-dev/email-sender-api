<template>
  <div class="container">
    <div class="row logo-div">
      <div class="col-md-6 offset-md-3 col-sm-12">
        <div class="text-center">
          <img src="@/assets/logo.png" height="80px" class="img-responsive"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3 col-sm-12">
        <h3 class="text-center">Sign Up</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3 col-sm-12">
        <div class="col-12">
          <span class="is-danger-text" v-show="errorMessage">{{errorMessage}}</span>
        </div>
        <form id="signup-form" v-on:submit.prevent="handleAuthentication">
          <div class="form-group col-12">
            <input
              class="form-control"
              v-model="input.first_name"
              type="text"
              placeholder="First Name"
              required
              v-validate="{ required: true, min: 2 }"
              :class="{'is-danger': errors.has('first_name')}"
              name="first_name"
              id="firstName"
            />
            <span v-show="errors.has('first_name')" class="help is-danger-text">
              {{ errors.first('first_name') }}
            </span>
          </div>
          <div class="form-group col-12">
            <input
              class="form-control"
              v-model="input.last_name"
              type="text"
              placeholder="Last Name"
              required
              v-validate="{ required: true, min: 2 }"
              :class="{'is-danger': errors.has('last_name')}"
              name="last_name"
              id="lastName"
            />
            <span v-show="errors.has('last_name')" class="help is-danger-text">
              {{ errors.first('last_name') }}
            </span>
          </div>
          <div class="form-group col-12">
            <input
            class="form-control"
            v-model="input.email"
            type="email"
            placeholder="Email"
            required
            v-validate="{ required: true, email: true }"
            :class="{'is-danger': errors.has('email')}"
            name="email"
            id="email"
            />
            <span v-show="errors.has('email')" class="help is-danger-text">
              {{ errors.first('email') }}
            </span>
          </div>
          <div class="form-group col-12">
            <input
              class="form-control"
              v-model="input.password"
              type="password"
              placeholder="Password"
              required
              autocomplete="password"
              v-validate="{ required: true, min: 6}"
              :class="{'is-danger': errors.has('password')}"
              name="password"
              ref="password"
              id="password"/>
            <span v-show="errors.has('password')" class="help is-danger-text">
              {{ errors.first('password') }}
            </span>
          </div>

          <div class="form-group col-12">
            <base-button
              :classNames="`btn vnc-green-background off-white col-12`"
              :buttonType="`submit`"
              :disabled="loading || errors.any()">
              SIGN UP
            </base-button>
          </div>
        </form>

        <div class="col-12">
          <p class="font10">
            Already have an account?
            <router-link to="/login" >click to login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiRequestMixin from '@/mixins/request-mixin';

// components
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'sign-up-view',
  mixins: [apiRequestMixin],
  components: {
    BaseButton,
  },
  data() {
    return {
      input: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        username: '',
      },
      signUpUrl: `${this.$api}/create-profile`,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors';
@import '../assets/scss/_fonts';

.btn:hover {
  color: $grey-light;
}
</style>
