<template>
  <div class="card-list-container">
    <div v-for="post in posts" :key="post.slug">
      <v-card :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Post } from '@/composables/post'

import VCard from '~/components/VCard.vue'
export default defineComponent({
  components: {
    VCard
  },
  props: {
    posts: {
      type: Array as () => Post[],
      required: true
    }
  }
})
</script>
