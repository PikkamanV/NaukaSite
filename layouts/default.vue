<template>
  <div>
    <app-header />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/color.scss';

html {
  box-sizing: border-box;
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 1rem;
  background-color: $color-reddish-brown;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  margin: 0;
  background-color: $color-pale-gray;
}

div {
  color: $color-reddish-brown;
}

a {
  color: $color-pink;
  text-decoration: none;
}
</style>
