<template>
  <div class="prev-next-container">
    <nuxt-link
      v-if="next"
      :to="{ name: 'post-slug', params: { slug: next.slug } }"
      class="next"
    >
      {{ next.title }}
    </nuxt-link>
    <span v-else>&nbsp;</span>
    <nuxt-link
      v-if="prev"
      :to="{ name: 'post-slug', params: { slug: prev.slug } }"
      class="prev"
    >
      {{ prev.title }}
    </nuxt-link>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Post } from '@/composables/post'

export default defineComponent({
  props: {
    prev: {
      type: Object as () => Post,
      default: () => null
    },
    next: {
      type: Object as () => Post,
      default: () => null
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';

.prev-next-container {
  display: grid;
  grid-template-columns: minmax(auto, 254px) minmax(4px, 1fr) minmax(auto, 254px);

  .next {
    grid-column: 1 / 2;
    padding: 0.5rem 2rem;
    color: $color-reddish-brown;
    text-align: left;
    background-color: $color-white;
    border-radius: 20px;
  }

  .next:hover {
    opacity: 0.7;
  }

  .prev {
    grid-column: 3 / 4;
    padding: 0.5rem 2rem;
    color: $color-reddish-brown;
    text-align: right;
    background-color: $color-white;
    border-radius: 20px;
  }

  .prev:hover {
    opacity: 0.7;
  }
}
</style>
