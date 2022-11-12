<template>
  <div class="card-container">
    <nuxt-link
      :to="{ name: 'post-slug', params: { slug: post.slug } }"
      class="card"
    >
      <div>
        <img :src="post.img" :alt="post.alt" class="image">
      </div>
      <div class="text-box">
        <div class="text">
          <div class="date">
            {{ formatDate(post.createdAt) }}
          </div>
          <div class="title">
            {{ post.title }}
          </div>
          <div class="description">
            {{ post.description }} ...
          </div>
        </div>
      </div>
    </nuxt-link>
    <div class="tags">
      <div v-for="tag in tags" :key="tag" class="tag">
        <v-tag :tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
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
    }
  },
  setup (props) {
    const tags = computed(() => props.post.tags)
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('ja')
    }

    return { tags, formatDate }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';

.card-container {
  margin: 0 0.5rem 1rem 0.5rem;

  .card {
    display: grid;
    grid-template-columns: 3fr 5fr;
    grid-column-gap: 1rem;

    .image {
      grid-column: 1 / 2;
      width: 100%;
      border-radius: 20px;
    }

    .text-box {
      grid-column: 2 / 3;
      padding: 1rem;
      background-color: $color-white;
      border-radius: 20px;

      .text {
        position: relative;
        height: 100%;

        .title {
          margin-top: 0.25px;
          font-size: 1.2rem;
        }

        .date {
          padding: 0.25rem 0.5rem;
          margin-bottom: 0.25rem;
          font-size: 1.25rem;
          color: $color-white;
          background-color: $color-pink;
          border-radius: 10px;
        }

        .description {
          font-size: 0.7rem;
        }
      }
    }
  }

  .card:hover {
    opacity: 0.7;
  }

  @media (max-width: 512px) {
    .card {
      padding: 0.5rem;
      background-color: $color-white;
      border-radius: 20px;

      .text-box {
        padding: 0;

        .text {
          .description {
            display: none;
          }
        }
      }
    }
  }

  .tags {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 512px) {
    .tags {
      display: none;
    }
  }
}
</style>
