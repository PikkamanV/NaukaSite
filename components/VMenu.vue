<template>
  <div class="menu-container">
    <nuxt-link to="/" class="card">
      <i class="fas fa-home icon" />
      <span class="caption">
        HOME
      </span>
    </nuxt-link>
    <!-- <nuxt-link to="/blog" class="card">
      <i class="fas fa-book icon" />
      <span class="caption">
        BLOG
      </span>
    </nuxt-link> -->
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/color.scss';

.menu-container {
  display: grid;
  grid-template-columns: repeat(2, 100px) 1fr;

  .card {
    display: grid;
    grid-template-rows: 1fr 22px;
    align-items: center;
    justify-content: center;
    color: $color-reddish-brown;

    .icon {
      grid-row: 1 / 2;
      font-size: 1.5rem;
      text-align: center;
    }

    .caption {
      grid-row: 2 / 3;
    }
  }

  .card:hover {
    color: $color-pink;
  }
}
</style>
