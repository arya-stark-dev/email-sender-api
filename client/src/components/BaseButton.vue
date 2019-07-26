<template>
  <button
    class="btn"
    :class="classNames"
    :type="buttonType"
    @click="$emit('clicked')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    classNames: {
      type: String,
    },
    buttonType: {
      type: String,
      default: 'submit',
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    color: $white;
  }
}
</style>
