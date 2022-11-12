<template>
  <div>
    <v-card-list :posts="posts" />
    <div v-if="posts.length >= 5" class="footer">
      <nuxt-link to="/blog" class="more-btn">
        MORE
      </nuxt-link>
    </div>
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

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';

.footer {
  display: flex;
  justify-content: center;

  .more-btn {
    padding: 0.5rem 3rem;
    font-size: 1.5rem;
    color: $color-white;
    background-color: $color-pink;
    border: $color-pink solid 1px;
    border-radius: 40px;
  }

  .more-btn:hover {
    opacity: 0.7;
  }
}
</style>
