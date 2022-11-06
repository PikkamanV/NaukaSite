<template>
  <div class="tag-container">
    <div class="tag">
      <i class="fas fa-tag" /> {{ tag }}の記事一覧
    </div>
    <v-post-list :posts="posts" class="posts" />
    <v-side-bar class="side-bar" />
  </div>
</template>

<script>
import VPostList from '~/components/VPostList.vue'
import VSideBar from '~/components/VSideBar.vue'
export default {
  components: {
    VPostList,
    VSideBar
  },
  async asyncData ({ $content, params }) {
    const posts = await $content('posts', params.slug)
      .where({ tags: { $contains: params.tag } })
      .only(['title', 'description', 'img', 'slug', 'createdAt', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      posts
    }
  },
  head () {
    return {
      title: 'タグ「' + this.tag + '」の記事一覧 - はやく現実になりたい！' // TODO: 共通化して
    }
  },
  computed: {
    tag () {
      return this.$route.params.tag
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
  display: grid;
  grid-template-rows: 32px 1fr;
  grid-template-columns: 1fr minmax(auto, 768px) minmax(auto, 256px) 1fr;

  .tag {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin-left: 0.5rem;
  }

  .posts {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  .side-bar {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
  }
}

@media (max-width: 768px) {
  .tag-container {
    display: grid;
    grid-template-rows: 32px 1fr auto;
    grid-template-columns: 1fr;
    margin: 1.5rem 0;

    .tag {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      margin-left: 0.5rem;
    }

    .posts {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }

    .side-bar {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
  }
}
</style>
