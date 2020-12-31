<template>
  <div class="side-bar-container">
    <v-title title="About me" />
    <div class="about-me">
      <img src="/icon.png" alt="icon" class="icon">
      葉鍵とラ！と自作PCのオタク。エロゲーとアニメを見ながら好きな物をプログラミングで作って人生をやっていきたいが、なぜか不労所得がないのでWebやぶろっくちぇーん？の仕事で生活している。さらにソフトウェアエンジニアということになっているが、学位もないのでインディーズエンジニアである。
    </div>
    <v-title title="Links" />
    <div class="links">
      <ul class="list">
        <li v-for="item in items" :key="item.name">
          <a :href="item.url" target="_blank" class="item">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VTitle from '~/components/VTitle.vue'

export default {
  components: {
    VTitle
  },
  data () {
    return {
      items: [
        { name: 'Twitter', url: 'https://twitter.com/PikkamanV' },
        { name: 'GitHub', url: 'https://github.com/PikkamanV' },
        { name: 'VRChat', url: 'https://vrchat.com/home/user/usr_b130543d-a1e6-4330-906e-a6bddde335c2' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/color.scss';

.side-bar-container {
  margin: 0 0.5rem;

  .about-me {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    background-color: $color-white;
    border-radius: 20px;

    .icon {
      float: left;
      width: 64px;
      margin: 0 0.3rem 0.3rem 0;
    }

    @media (max-width: 768px) {
      .icon {
        width: 48px;
      }
    }
  }

  .links {
    padding: 0.5rem;
    background-color: $color-white;
    border-radius: 20px;

    .list {
      list-style: none;
    }
  }
}

@media (max-width: 768px) {
  .side-bar-container {
    margin: 0.5rem 0.5rem 0;
  }
}

</style>
