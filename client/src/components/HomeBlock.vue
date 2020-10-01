<template>
  <div class="block" :class="{'block--right': alignRight}">
    <h3 class="block__title">{{ title }}</h3>
    <p class="block__value" :class="{important}" v-if="type === 'string'">{{ value | numberWithSpace }}</p>
    <p class="block__value" :class="{important}" v-if="type === 'object' && value">{{ value.label }}</p>
    <p class="block__value" :class="{important}" v-if="type === 'array'">
      <template v-for="(val, i) in value">
        <span :key="i">{{ val.value }}</span></br>
      </template>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    important: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    alignRight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  $block: &;
  margin-bottom: 32px;

  &--right {
    text-align: right;

    #{$block}__value.important {
      color: #3f78de;
    }
  }

  &__title {
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 0.3px;
    color: #7a7089;
    margin-bottom: 8px;
  }

  &__value {
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 0.2px;
    color: #000000;
    margin: 0;

    &.important {
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 0.3px;
      color: #ee5355;
    }
  }
}
</style>
