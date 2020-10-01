<template>
  <div class="home">
    <div class="container">
      <transition @enter="enter" @leave="leave" :css="false" mode="out-in" appear>
        >
        <router-view ref="page" :key="$route.path"/>
      </transition>
      <home-navigation/>
    </div>
  </div>
</template>

<script>
import HomeNavigation from '@/components/HomeNavigation.vue';
import { TweenMax } from 'gsap';

export default {
  components: { HomeNavigation },
  name: 'home',
  methods: {
    enter(el, done) {
      if (this.$refs.page.enter) {
        this.$refs.page.enter(el, done);
      } else {
        TweenMax.from(el, 0.5, { alpha: 0, onComplete: done });
      }
    },
    leave(el, done) {
      if (this.$refs.page.leave) {
        this.$refs.page.leave(el, done);
      } else {
        TweenMax.to(el, 0.5, { alpha: 0, onComplete: done });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
