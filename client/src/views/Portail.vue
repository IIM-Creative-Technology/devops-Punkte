<template>
  <div class="portail">
    <div class="portail__caption" v-parallax="0.2" v-if="index === 0">
      <div>
        <img :src="LogoSVG" class="step__logo"/>
        <div class="portail__description">
          Créez et optimisez vos contenus impactant grâce à notre outil d’accompagnement à la création de vidéo.</div>
        </div>
      </div>
      <div>
        <home-bg v-if="index == 0" v-parallax="0.2" />
      </div>
    <step1 v-if="index === 1"/>
    <step2 v-if="index === 2"/>
    <step3 v-if="index === 3"/>

    <div>
      <button @click="nextStep" v-if="index < 3" class="portail__btn-next btn-outline">
        <span>Suivant</span>
        <next-arr class="portail__next-arrow"/>
      </button>
      <router-link
        v-if="index === 3"
        @click="nextStep"
        class="portail__btn-next btn-outline"
        to="/categories-averages"
      >
        <span>Suivant</span>
        <next-arr class="portail__next-arrow"/>
      </router-link>
      <button v-if="index >= 1" @click="prevStep" class="portail__btn-prev">Retour</button>
    </div>
  </div>
</template>

<script>
import LogoSVG from '@/assets/datatube-logo-home.png';
import image from '@/assets/portail-bg.svg';
import Step1 from '@/components/Step1.vue';
import Step2 from '@/components/Step2.vue';
import Step3 from '@/components/Step3.vue';
import nextArr from '@/assets/fleche.vue';
import HomeBg from '@/assets/home-bg.vue';

export default {
  data() {
    return {
      index: 0,
      LogoSVG,
      image,
    };
  },
  components: {
    Step1,
    Step2,
    Step3,
    nextArr,
    HomeBg,
  },
  methods: {
    nextStep() {
      this.index++;
    },
    prevStep() {
      this.index--;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/fonts/geomanist.css";
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:600");
$main-red: #ee5355;
.portail {
  * {
    box-sizing: border-box;
  }
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;

  &__caption {
    display: flex;
    justify-content: space-around;

    font-family: "geomanistregular", Arial, sans-serif;
    font-size: 24px;
    color: #7a7089;
  }

  &__description {
    width: 70%;
    color: #000;
    position: relative;
    font-family: 'Geomanist';
    font-weight: 500;
  }

  &__image {
    img  {
      display: block;
    }
  }

  &__link {
    position: absolute;
    bottom: -18%; // a animer
    right: -1%; // a animer
    // passer la hauteur et la largeur a 100% au maintiens
  }

  &__hold {
    position: absolute;

    font-size: 26px;
    transform: rotate(6deg) translate(39%, 31%);
    font-weight: bold;
  }

  &__btn {
    text {
      font-family: "Josefin Sans", sans-serif;
    }
    &-next {
      text-decoration: none;
      display: block;
      position: absolute;
      bottom: 48px;
      right: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 2px $main-red;

      padding: 16px 24px 12px 24px;
      font-size: 18px;
      cursor: pointer;
    }
    &-enter {
      width: 100%;
      position: absolute;
      height: 100%;
      top: 0;
    }
    &-prev {
      position: absolute;
      left: 64px;
      top: 15%;

      cursor: pointer;

      background-color: transparent;
      border: none;
      text-transform: uppercase;
      outline: none;

      &::before {
        content: url("../assets/arrow_right.svg");
        padding-right: 10px;
      }
    }
  }

  &__next-arrow {
    width: 16px;
    height: 10px;
    margin-left: 8px;
    margin-top: -3px;
  }
}
</style>
