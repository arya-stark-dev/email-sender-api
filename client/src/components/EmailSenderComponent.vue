<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-4">
        <h3 class="text-center">Email Sender Form</h3>
      </div>
    </div>
    <div class="row">
      <div class="alert alert-success w-100 text-center" role="alert" v-if="emailSent === 1 && triggeredSend">
        Email sent successfully!
      </div>
      <div class="alert alert-danger w-100 text-center" role="alert" v-if="emailSent === 0 && triggeredSend">
        {{errorMessage}}
      </div>
    </div>
    <div class="row">
      <form id="signin-form" v-on:submit.prevent="sendEmail" class="email-sender">
        <div class="form-group col-12">
          <label for="senderEmail">Sender Email address:</label>
          <input
          class="form-control"
          v-model="input.sender"
          type="email"
          placeholder="Sender's Email"
          required
          v-validate="{ required: true, email: true }"
          :class="{'is-danger': errors.has('email')}"
          name="sender"
          id="senderEmail"/>
          <span v-show="errors.has('sender')" class="help is-danger-text">
            {{ errors.first('sender') }}
          </span>
        </div>

        <div class="form-group col-12">
          <label for="receiverEmail">Receiver Email address:</label>
          <input
          class="form-control"
          v-model="input.receiver"
          type="email"
          placeholder="Receiver's Email"
          required
          v-validate="{ required: true, email: true }"
          :class="{'is-danger': errors.has('email')}"
          name="receiver"
          id="receiverEmail"/>
          <span v-show="errors.has('receiver')" class="help is-danger-text">
            {{ errors.first('receiver') }}
          </span>
        </div>

        <div class="form-group col-12">
          <label for="subject">Subject:</label>
          <input
            class="form-control"
            v-model="input.subject"
            type="text"
            placeholder="Subject"
            required
            v-validate="{ required: true }"
            :class="{'is-danger': errors.has('subject')}"
            name="subject"
            ref="subject"
            id="subject"/>
          <span v-show="errors.has('subject')" class="help is-danger-text">
            {{ errors.first('subject') }}
          </span>
        </div>

        <div class="form-group col-12">
          <label for="content">Content:</label>
          <textarea
            class="form-control"
            v-model="input.content"
            type="text"
            placeholder="Enter Message body here"
            required
            v-validate="{ required: true }"
            :class="{'is-danger': errors.has('content')}"
            name="content"
            rows="10"
            ref="content"
            id="content">
          </textarea>
          <span v-show="errors.has('content')" class="help is-danger-text">
            {{ errors.first('content') }}
          </span>
        </div>

        <div class="form-group col-12">
          <base-button
            :classNames="`btn vnc-green-background off-white`"
            :buttonType="`submit`"
            :disabled="loading || !validFields">
            SEND MESSAGE
          </base-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import requestMixin from '@/mixins/request-mixin';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'email-sender',
  mixins: [requestMixin],
  components: {
    BaseButton,
  },
  data() {
    return {
      input: {
        sender: '',
        receiver: '',
        subject: '',
        content: '',
      },
      emailSent: -1,
      triggeredSend: false,
    };
  },
  computed: {
    validFields() {
      return Object.keys(this.fields).every(key => this.fields[key].valid);
    },
  },
  methods: {
    async sendEmail() {
      this.triggeredSend = true;
      try {
        const payload = {
          url: `${this.$api}/email/send`,
          data: this.input,
          method: 'POST',
        };
        // await this.requestWithBody(payload);

        this.$emit('send-message-status', true);

        this.emailSent = 1;
        this.input = {
          sender: '',
          receiver: '',
          subject: '',
          content: '',
        };

        setTimeout(() => {
          this.triggeredSend = false;
          this.emailSent = -1;
        }, 2000);

        this.$validator.reset();
      } catch (error) {
        this.emailSent = 0;
        this.handleError(error);

        setTimeout(() => {
          this.triggeredSend = false;
          this.emailSent = -1;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.email-sender {
  width: 100%;
}
.container {
  margin-top: 80px;
}
</style>
