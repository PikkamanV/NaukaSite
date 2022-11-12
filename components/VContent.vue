<template>
  <div class="content-container">
    <div class="header">
      <h1 class="title">
        {{ post.title }}
      </h1>
      <div class="date">
        {{ formatDate(post.createdAt) }}
      </div>
    </div>
    <div class="tags">
      <div v-for="tag in post.tags" :key="tag">
        <v-tag :tag="tag" />
      </div>
    </div>
    <div class="content-body">
      <nuxt-content :document="post" />
    </div>
    <v-prev-next :prev="prev" :next="next" class="prev-next" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Post } from '@/composables/post'

import VTag from '~/components/VTag.vue'
export default defineComponent({
  components: {
    VTag
  },
  props: {
    post: {
      type: Object as () => Post,
      required: true
    },
    prev: {
      type: Object as () => Post,
      required: false,
      default: null
    },
    next: {
      type: Object as () => Post,
      required: false,
      default: null
    }
  },
  setup () {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('ja')
    }
    return { formatDate }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';

.content-container {
  margin: 0 0.5rem;

  .header {
    padding: 1rem 2rem;
    background-color: $color-white;
    border-radius: 20px;

    .title {
      margin: 0;
    }

    .date {
      display: flex;
      justify-content: flex-end;
    }
  }

  .tags {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }

  .content-body {
    padding: 0.5rem 2rem;
    background-color: $color-white;
    border-radius: 20px;
  }

  .prev-next {
    margin: 0.5rem 0;
  }
}
</style>
