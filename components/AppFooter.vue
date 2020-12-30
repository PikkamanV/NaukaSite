<template>
  <div class="footer-container">
    <div class="attention">
      実はえっちなサイトかもしれない
    </div>
    <div class="cory-rignt">
      ©2021 はやく現実になりたい All rights reserved.
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/color.scss';

.footer-container {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  padding: 1rem 0;
  margin-top: 1rem;
  text-align: center;
  background-color: $color-reddish-brown;

  .attention {
    grid-row: 1 / 2;
    color: $color-white;
  }

  .cory-rignt {
    grid-row: 2 / 3;
    color: $color-white;
  }
}
</style>
