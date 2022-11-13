<template>
  <div class="blog-container">
    <v-post-list :posts="posts" class="posts" />
    <v-side-bar class="side-bar" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { fetchPosts } from '@/composables/post'

import VPostList from '~/components/VPostList.vue'
import VSideBar from '~/components/VSideBar.vue'
export default defineComponent({
  components: {
    VPostList,
    VSideBar
  },
  setup () {
    const { $content } = useContext()
    const posts = useAsync(() => fetchPosts($content, undefined, undefined))
    return { posts }
  },
  head: { title: '記事一覧 - はやく現実になりたい！' } // TODO: 共通化して
})
</script>

<style lang="scss" scoped>
.blog-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 768px) minmax(auto, 256px) 1fr;

  .posts {
    grid-column: 2 / 3;
  }

  .side-bar {
    grid-column: 3 / 4;
  }
}

@media (max-width: 768px) {
  .blog-container {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    margin: 1.5rem 0;

    .posts {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    .side-bar {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
  }
}
</style>
