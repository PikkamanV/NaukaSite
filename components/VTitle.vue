<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/color.scss';

.title {
  padding: 0.5rem 1rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: $color-white;
  background-color: $color-pink;
  border-radius: 20px;
}
</style>
