<template>
  <div class="header-container">
    <nuxt-link to="/" class="logo">
      <div class="text">
        はやく現実になりたい！
      </div>
    </nuxt-link>
    <v-menu class="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import VMenu from '~/components/VMenu.vue'
export default defineComponent({
  components: {
    VMenu
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';

.header-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 256px) minmax(auto, 768px) 1fr;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  background-color: $color-white;
  border-bottom: 1px solid;

  .logo {
    grid-column: 2 / 3;

    .text {
      font-size: 1.4rem;
      text-align: center;
    }
  }

  .menu {
    grid-column: 3 / 4;
  }
}

@media (max-width: 768px) {
  .header-container {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;

    .logo {
      grid-row: 1 / 2;
      grid-column: 1 / 2;

      .text {
        text-align: center;
      }
    }

    .menu {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
  }
}
</style>
