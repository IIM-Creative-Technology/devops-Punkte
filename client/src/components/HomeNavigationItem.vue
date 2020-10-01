<template>
  <router-link
    :class="{'home-nav__list-item--selected': isSelected }"
    class="home-nav__list-item"
    :to="{ name: section.routeName }"
    tag="li"
  >
    <span>{{ `${section.name}` }}</span>
  </router-link>
</template>

<script>
import _ from 'lodash';
import Utils from '@/mixins/Utils.vue';

export default {
  mixins: [Utils],
  props: {
    index: Number,
    section: Object,
    isSelected: Boolean,
  },
};
</script>

<style lang="scss" scoped>

$main-red: #ee5355;
$light-red: #ffbdb3;
$main-grey: #9a9a9a;

.home-nav {
  &__list-item {
    display: flex;
    justify-content: flex-end;

    color: $main-grey;
    font-size: 18px;
    list-style-type: none;
    text-transform: uppercase;

    cursor: pointer;
    &--selected {
      position: relative;
      color: $main-red;
      &:after {
        content:'';
        display: block;
        position: absolute;
        bottom: 0;

        background-color: $light-red;
        width: 100%;
        height: 4px;
      }
    }

    &--right {
      text-align: right;
    }
  }
}
</style>
