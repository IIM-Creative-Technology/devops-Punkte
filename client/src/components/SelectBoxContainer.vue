<template>
  <div class="select-box container">
    <div class="select-box-left">
      <select-box :options="countries" column="1" name="country"/>
      <select-box :options="categories" column="1" name="category"/>
      <select-box :options="subscribersRanges[0]" column="1" name="range"/>
    </div>
    <div class="select-box-right" v-show="$store.state.compare">
      <select-box :options="countries" column="2" name="country"/>
      <select-box :options="categories" column="2" name="category"/>
      <select-box :options="subscribersRanges[1]" column="2" name="range"/>
    </div>
  </div>
</template>

<script>
import SelectBox from '@/components/SelectBox.vue';

export default {
  components: {
    SelectBox,
  },
  props: {
    countries: {
      type: Array,
      default: () => [],
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
      required: true,
    },
    subscribersRanges: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>

<style lang="scss">
.select-box {
  display: flex;
  justify-content: space-between;

  &-left,
  &-right {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, calc(100% / 3)));
    grid-gap: 8px;
    width: 45%;
  }

  &-left {
    padding-right: 10px;

    .select__picked {
      background: #de543f;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .select .option.option--selected {
      background: #de543f;
      color: #fff;
    }
  }

  &-right {
    padding-left: 10px;

    .select__picked {
      background: #3f78de;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .select .option.option--selected {
      background: #3f78de;
      color: #fff;
    }
  }
}
</style>
