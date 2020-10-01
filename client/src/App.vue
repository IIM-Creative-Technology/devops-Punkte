<template>
  <div id="app">
    <vue-particles
      v-parallax="-0.5"
      color="#dedede"
      :hoverEffect="false"
      :clickEffect="false"
      class="particle-background"
      v-if="hideParticles"
    />
    <div class="topbar" v-if="$route.path !== '/'">
      <div class="container">
        <div class="logo">
          <img :src="LogoSvg" class="step__logo"/>
        </div>
      </div>
      <select-box-container
        :countries="getCountries"
        :categories="getCategories"
        :subscribersRanges="getSubscribersRanges"
        v-if="getCountries.length && getCategories.length"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo-datatube-default.png';
import SelectBoxContainer from '@/components/SelectBoxContainer.vue';
import { mapGetters } from 'vuex';

export default {
  components: { SelectBoxContainer },
  data() {
    return {
      hideParticles: true,
      LogoSvg,
    };
  },
  async created() {
    await this.$store.dispatch('setList', 'countries');
    await this.$store.dispatch('setList', 'categories');
    window.aaa = this.$store;
  },
  computed: {
    ...mapGetters(['getCountries', 'getSubscribersRanges', 'getCategories']),
  },
};
</script>


<style lang="scss">
@font-face {
  font-family: "Geomanist";
  font-style: normal;
  font-weight: normal;
  src: local("Geomanist Regular"),
    url("/fonts/Geomanist-Regular.woff") format("woff");
}

@font-face {
  font-family: "Geomanist";
  font-style: bold;
  font-weight: bold;
  src: local("Geomanist Bold"), url("/fonts/Geomanist-Bold.woff") format("woff");
}

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: "Geomanist", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #180940;
}

.step__logo {
  height: 20px;
  margin-bottom: 12px;
  margin-left: 4px;
}
.container {
  padding: 0 64px;
  margin: 0 auto;
}

.topbar {
  position: relative;
  z-index: 999;
  padding: 2em 0 0;

  .container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }
}

.highcharts-background {
  display: none;
}

.particle-background {
  background: #fafafa;
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
}
$sz: 50px;
$br: 100%;
$default-z: 15;
.btn-outline {
  margin: 0px auto;
  max-width: 225px;
  padding: 18px 14px 12px 14px;
  display: block;
  border-radius: 4px;
  border: solid 2px #ffbdb3;
  background-color: #ffffff;

  text-align: center;
  font-family: "Geomanist";
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  outline: none;
  cursor: pointer;

  color: #de543f;
  overflow: hidden;
  span {
    z-index: 90;
    position: relative;
  }

  svg {
    margin-left: 8px;
  }
  &:after {
    position: absolute;
    z-index: $default-z;
    content: "";
    left: -$sz/2;
    top: 0;
    transition: transform 0.6s ease;
    transform: translateX(-$sz/2);

    width: $sz;
    height: 100%;
    border-radius: 100%;
    background-color: #de543f;
  }

  &:hover {
    color: #FFF;

    .portail__next-arrow {
      position: relative;
      #Homepage {
        transition: fill .5s ease;
        fill: #FFF;
      }
    }
    &:after {
      transform: scale(10);
    }
    svg {
      position: relative;
      z-index: 990;
      #flechefill {
        fill: #FFF;
      }
    }
  }
}
</style>
