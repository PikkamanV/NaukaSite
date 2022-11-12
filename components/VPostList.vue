<template>
  <div>
    <v-card-list :posts="posts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Post } from '@/composables/post'
import VCardList from '~/components/VCardList.vue'
export default defineComponent({
  components: {
    VCardList
  },
  props: {
    posts: {
      type: Array as () => Post[],
      required: true
    }
  }
})
</script>
