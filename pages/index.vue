<template>
  <div class="index-container">
    <v-dashboard :posts="posts" class="dashboard" />
    <v-side-bar class="side-bar" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { fetchPosts } from '@/composables/post'

import VDashboard from '~/components/VDashboard.vue'
import VSideBar from '~/components/VSideBar.vue'
export default defineComponent({
  components: {
    VDashboard,
    VSideBar
  },
  setup () {
    const { $content } = useContext()
    const posts = useAsync(() => fetchPosts($content, undefined, 5))
    return { posts }
  }
})
</script>

<style lang="scss" scoped>
.index-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 768px) minmax(auto, 256px) 1fr;

  .dashboard {
    grid-column: 2 / 3;
  }

  .side-bar {
    grid-column: 3 / 4;
  }
}

@media (max-width: 768px) {
  .index-container {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    margin: 1.5rem 0;

    .dashboard {
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
