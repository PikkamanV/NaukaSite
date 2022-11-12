<template>
  <nuxt-link :to="{ name: 'post-tag-tag', params: { tag: tag } }" class="tag">
    <i class="fas fa-tag" />
    {{ tag }}
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tag: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.5rem 0 0 1rem;
  font-size: 0.8rem;
  color: $color-reddish-brown;
  background-color: $color-white;
  border-radius: 10px;
}

.tag:hover {
  opacity: 0.7;
}
</style>
