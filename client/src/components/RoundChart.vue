<template>
  <div></div>
</template>

<script>
import Highcharts from 'highcharts';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    if (this.chart) {
      this.chart.update(this.options);
    } else {
      this.chart = Highcharts.chart(this.$el, this.options);
    }
  },
  watch: {
    options: {
      handler(newValue) {
        if (this.chart) {
          this.chart.update({
            series: [
              {
                data: [...newValue.series[0].data],
              },
              {
                data: [...newValue.series[1].data],
              },
            ],
          });
        } else {
          this.chart = Highcharts.chart('container', newValue);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.highcharts-credits {
  display: none;
}
#container {
  width: 100%;
}
</style>
