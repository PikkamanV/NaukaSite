<template>
  <div class="post-container">
    <v-content :post="post" :prev="prev" :next="next" class="content" />
    <v-side-bar class="side-bar" />
  </div>
</template>

<script>
import VContent from '~/components/VContent.vue'
import VSideBar from '~/components/VSideBar.vue'

export default {
  components: {
    VContent,
    VSideBar
  },
  async asyncData ({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()
    const [prev, next] = await $content('posts')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      post,
      prev,
      next
    }
  }
}
</script>

<style>
.post-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 768px) minmax(auto, 256px) 1fr;
}

.content {
  grid-column: 2 / 3;
}

.side-bar {
  grid-column: 3 / 4;
}

.nuxt-content img {
  max-width: 100%;
}

.nuxt-content a {
  word-break: break-word;
}

@media (max-width: 768px) {
  .post-container {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
    margin: 1.5rem 0;
  }

  .content {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .side-bar {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
}
</style>
