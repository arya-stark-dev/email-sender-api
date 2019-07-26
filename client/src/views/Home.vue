<template>
  <div class="home ">
    <navigation-bar />
    <email-sender />
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue';
import EmailSender from '@/components/EmailSenderComponent.vue';

export default {
  name: 'home',
  components: {
    NavigationBar,
    EmailSender,
  },
};
</script>
