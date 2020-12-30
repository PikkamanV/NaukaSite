<template>
  <div class="card-list-container">
    <div v-for="post in posts" :key="post.slug">
      <v-card :post="post" />
    </div>
  </div>
</template>

<script>
import VCard from '~/components/VCard.vue'
export default {
  components: {
    VCard
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
