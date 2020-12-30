<template>
  <div>
    <v-card-list :posts="posts" />
  </div>
</template>

<script>
import VCardList from '~/components/VCardList.vue'
export default {
  components: {
    VCardList
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
