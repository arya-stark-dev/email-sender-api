export default {
  data() {
    return {
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    getRequest(url) {
      const userAuthPayload = this.getAuthorizationPayload();

      return this.$http.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userAuthPayload.token,
        },
      });
    },
    requestWithBody(payload) {
      const userAuthPayload = this.getAuthorizationPayload();

      return this.$http({
        method: payload.method,
        url: payload.url,
        data: payload.data,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userAuthPayload.token,
        },
      });
    },
    handleError(error) {
      if (!error.response) {
        this.errorMessage = 'A network error occurred. Please try again';
      } else if (error.response.data.errors) {
        this.errorMessage = error.response.data.errors.join(', ');
      } else {
        this.errorMessage = 'An error occurred while performing request. Try again';
      }
    },
    async handleAuthentication() {
      const validatedForm = await this.$validator.validateAll();

      if (validatedForm) {
        this.loading = true;
        try {
          const createdUser = await this.requestWithBody({
            method: 'POST',
            url: this.signUpUrl,
            data: this.input,
          });

          const response = createdUser.data.data;

          await this.$store.dispatch('updateUserToken', {
            token: response.token,
          });
          this.loading = false;

          this.$router.push('/');
        } catch (error) {
          this.loading = false;
          this.handleError(error);
        }
      } else {
        this.errorMessage = 'Fill out form appropriately to submit it.';
      }
    },
    getAuthorizationPayload() {
      const userPayload = this.$store.getters.getUserToken;

      return {
        token: userPayload.token,
      };
    },
  },
};
