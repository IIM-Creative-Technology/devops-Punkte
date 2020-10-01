<template>
  <div class="home-nav">
    <ul class="home-nav__list-container">
      <HomeNavigationItem
        v-for="(section, index) in sections"
        :key="index"
        :index="index"
        :section="section"
        @click.native="selectedIndex = index"
        :isSelected="index === selectedIndex"
      />
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import Utils from '@/mixins/Utils.vue';
import HomeNavigationItem from '@/components/HomeNavigationItem.vue';
import camelCase from 'lodash/camelCase';

export default {
  mixins: [Utils],
  components: { HomeNavigationItem },
  data() {
    return {
      selectedIndex: 0,
      sections: [
        {
          name: 'Moyennes des catégories',
          routeName: 'categoriesAverages',
        },
        {
          name: 'Youtubeurs',
          routeName: 'youtubers',
        },
        {
          name: 'Nombres de vues',
          routeName: 'viewsCounts',
        },
        {
          name: 'Durées des vidéos',
          routeName: 'videosDurations',
        },
        {
          name: 'Nombres de publications',
          routeName: 'bestPublicationTimes',
        },
        {
          name: 'Likes / dislikes',
          routeName: 'likesDislikes',
        },
      ],
    };
  },
  mounted() {
    this.selectedIndex = this.sections
      .map(section => camelCase(section.routeName))
      .indexOf(this.$route.name);
  },
};
</script>

<style lang="scss" scoped>
$main-red: #ee5355;
.home-nav {
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  height: 65px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);

  &__list-container {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;

    height: 100%;
  }
  &__list-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: 13px;
    font-family: 'integralcf', sans-serif;
    list-style-type: none;

    cursor: pointer;
    &--selected {
      font-weight: bold;
    }
  }
}
</style>
