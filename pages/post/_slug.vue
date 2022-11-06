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
  },
  head () {
    return {
      title: this.post.title + ' - はやく現実になりたい！', // TODO: 共通化して
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$config.baseUrl + '/post/' + this.post.slug
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$config.baseUrl + '/ogp/' + this.post.slug + '.png'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
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
