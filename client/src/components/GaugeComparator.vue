<template>
  <div class="gaugeComparator">
    <h3 class="gaugeComparatorTitle">{{ title }}</h3>
    <div class="gaugeComparatorGauges">
      <div class="gaugeComparatorGauge left">
        <div class="gaugeComparatorGaugeFill left" :style="{ width: percentages[0] + '%' }"></div>
      </div>
      <div v-if="showBoth" class="gaugeComparatorGauge right">
        <div class="gaugeComparatorGaugeFill right" :style="{ width: percentages[1] + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    showBoth: {
      type: Boolean,
      default: false
    },
    percentages: {
      type: Array,
      default: () => [0, 0]
    }
  }
}
</script>

<style lang="scss">
.gaugeComparator {
  &Title {
    text-align: center;
    font-size: 22px;
  }

  &Gauges {
    display: grid;
    grid-template-columns: repeat(4fr);
    grid-gap: 50px;
    grid-auto-flow: column;

    .gaugeComparatorGauge {
      position: relative;
      height: 32px;
      background-color: #e9ebf1;

      &.left {
        border-radius: 4px 0 0 4px;
      }

      &.right {
        border-radius: 0 4px 4px 0;
      }

      &Fill {
        height: 100%;
        position: absolute;
        top: 0;

        &.left {
          right: 0;
          background-image: linear-gradient(to left, #ff9e8f, #de543f);
          border-radius: 4px 0 0 4px;
        }

        &.right {
          border-radius: 0 4px 4px 0;
          left: 0;
          background: rgba(157,195,255,1);
          background: -moz-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
          background: -webkit-gradient(left top, right top, color-stop(0%, rgba(157,195,255,1)), color-stop(100%, rgba(63,121,222,1)));
          background: -webkit-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
          background: -o-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
          background: -ms-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
          background: linear-gradient(to right, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
        }
      }
    }
  }
}
</style>
