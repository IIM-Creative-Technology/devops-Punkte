<template>
  <div class="grid">
    <section-title
      ref="title"
      v-parallax="0.1"
      class="section_title"
      title="Nombres de vues"
      edito="Vous pourrez comprendre ce qui marche autour de vous."
    />
    <div class="grid__left" ref="left" v-parallax="0.2">
      <div class="information__container">
        <home-block
          v-for="(block, i) in column1"
          :key="i"
          :title="block.title"
          :value="block.value"
          :important="block.important"
          :type="block.type"
        />
      </div>
    </div>

    <div class="grid__center" v-parallax="0.3">
      <round-chart ref="center1" :options="minimumChartOptions"/>
      <round-chart ref="center2" :options="averageChartOptions"/>
      <round-chart ref="center3" :options="maximumChartOptions"/>
    </div>

    <div class="grid__right" ref="right" v-parallax="0.2">
      <div class="information__container">
        <home-block
          v-for="(block, i) in column2"
          :key="i"
          :title="block.title"
          :value="block.value"
          :important="block.important"
          :type="block.type"
          :alignRight="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBlock from '@/components/HomeBlock.vue';
import RoundChart from '@/components/RoundChart.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import { mapGetters } from 'vuex';
import { TimelineLite } from 'gsap';

export default {
  components: {
    RoundChart,
    HomeBlock,
    SectionTitle,
  },
  data() {
    return {
      models: [
        {
          title: 'Nombre de vues le plus faible',
          value: 'minimumVideoView',
          type: 'string',
          important: false,
        },
        {
          title: 'Nombre de vues le plus élevée',
          value: 'maximumVideoView',
          type: 'string',
          important: false,
        },
        {
          title: 'Moyenne du nombre de vues',
          value: 'averageViewCount',
          type: 'string',
          important: false,
        },
      ],
      options: {
        chart: {
          width: 300,
          type: 'solidgauge',
        },

        title: {
          text: undefined,
          style: {
            fontSize: '24px',
          },
        },

        tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
            fontSize: '16px',
            width: '190px',
            textAlign: 'center',
          },
          pointFormat:
            '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.x}</span><br>{series.name}',
          positioner(labelWidth, labelHeight) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: this.chart.plotHeight / 2 - 30,
            };
          },
        },

        pane: {
          startAngle: 0,
          endAngle: 360,
          background: [
            {
              // Track for Move
              outerRadius: '112%',
              innerRadius: '102%',
              borderWidth: 0,
            },
            {
              // Track for Exercise
              outerRadius: '101%',
              innerRadius: '91%',
              borderWidth: 0,
            },
          ],
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false,
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true,
          },
        },

        series: [
          {
            name: 'Move',
            data: [
              {
                radius: '112%',
                innerRadius: '102%',
                y: 80,
                color: '#de543f',
              },
            ],
          },
          {
            name: 'Exercise',
            data: [
              {
                radius: '101%',
                innerRadius: '91%',
                y: 65,
                color: '#3f78de',
              },
            ],
          },
        ],
      },
      options2: {
        chart: {
          width: 300,
          type: 'solidgauge',
        },

        title: {
          text: undefined,
          style: {
            fontSize: '24px',
          },
        },

        tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
            fontSize: '16px',
            width: '190px',
            textAlign: 'center',
          },
          pointFormat:
            '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.x}</span><br>{series.name}',
          positioner(labelWidth, labelHeight) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: this.chart.plotHeight / 2 - 30,
            };
          },
        },

        pane: {
          startAngle: 0,
          endAngle: 360,
          background: [
            {
              // Track for Move
              outerRadius: '112%',
              innerRadius: '102%',
              borderWidth: 0,
            },
            {
              // Track for Exercise
              outerRadius: '101%',
              innerRadius: '91%',
              borderWidth: 0,
            },
          ],
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false,
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true,
          },
        },

        series: [
          {
            name: 'Move',
            data: [
              {
                radius: '112%',
                innerRadius: '102%',
                y: 80,
                color: '#de543f',
              },
            ],
          },
          {
            name: 'Exercise',
            data: [
              {
                radius: '101%',
                innerRadius: '91%',
                y: 65,
                color: '#3f78de',
              },
            ],
          },
        ],
      },
      options3: {
        chart: {
          width: 300,
          type: 'solidgauge',
        },

        title: {
          text: undefined,
          style: {
            fontSize: '24px',
          },
        },

        tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
            fontSize: '16px',
            width: '190px',
            textAlign: 'center',
          },
          pointFormat:
            '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.x}</span><br>{series.name}',
          positioner(labelWidth, labelHeight) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: this.chart.plotHeight / 2 - 30,
            };
          },
        },

        pane: {
          startAngle: 0,
          endAngle: 360,
          background: [
            {
              // Track for Move
              outerRadius: '112%',
              innerRadius: '102%',
              borderWidth: 0,
            },
            {
              // Track for Exercise
              outerRadius: '101%',
              innerRadius: '91%',
              borderWidth: 0,
            },
          ],
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false,
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true,
          },
        },

        series: [
          {
            name: 'Move',
            data: [
              {
                radius: '112%',
                innerRadius: '102%',
                y: 80,
                color: '#de543f',
              },
            ],
          },
          {
            name: 'Exercise',
            data: [
              {
                radius: '101%',
                innerRadius: '91%',
                y: 65,
                color: '#3f78de',
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    column1() {
      return this.models.map(model => ({
        ...model,
        value: this.getColumn1Datas[model.value],
      }));
    },
    column2() {
      return this.models.map(model => ({
        ...model,
        value: this.getColumn2Datas[model.value],
      }));
    },
    minimumChartOptions() {
      const newOptions = { ...this.options };
      const minimumVideoView = Math.max(
        this.getColumn2Datas.minimumVideoView,
        this.getColumn1Datas.minimumVideoView,
      );

      newOptions.series[0].name = 'Nombre de vues le plus faible';
      newOptions.series[0].data = [
        {
          radius: '112%',
          innerRadius: '102%',
          y: Math.floor(
            (this.getColumn1Datas.minimumVideoView * 100)
              / (this.getColumn2Datas.minimumVideoView
                + this.getColumn1Datas.minimumVideoView),
          ),
          x: this.$options.filters.numberWithSpace(
            this.getColumn1Datas.minimumVideoView,
          ),
          color: '#de543f',
        },
      ];
      newOptions.series[1].name = 'Nombre de vues le plus faible';
      newOptions.series[1].data = [
        {
          radius: '101%',
          innerRadius: '91%',
          y: Math.floor(
            (this.getColumn2Datas.minimumVideoView * 100)
              / (this.getColumn2Datas.minimumVideoView
                + this.getColumn1Datas.minimumVideoView),
          ),
          x: this.$options.filters.numberWithSpace(
            this.getColumn2Datas.minimumVideoView,
          ),
          color: '#3f78de',
        },
      ];
      return newOptions;
    },
    maximumChartOptions() {
      const newOptions = { ...this.options2 };

      const maximumVideoView = Math.max(
        this.getColumn2Datas.maximumVideoView,
        this.getColumn1Datas.maximumVideoView,
      );

      newOptions.series[0].name = 'Nombre de vues le plus élevée';
      newOptions.series[0].data = [
        {
          radius: '112%',
          innerRadius: '102%',
          y: Math.floor(
            (this.getColumn1Datas.maximumVideoView * 100)
              / (this.getColumn2Datas.maximumVideoView
                + this.getColumn1Datas.maximumVideoView),
          ),
          x: this.$options.filters.numberWithSpace(
            this.getColumn1Datas.maximumVideoView,
          ),
          color: '#de543f',
        },
      ];

      newOptions.series[1].name = 'Nombre de vues le plus élevée';
      newOptions.series[1].data = [
        {
          radius: '101%',
          innerRadius: '91%',
          y: Math.floor(
            (this.getColumn2Datas.maximumVideoView * 100)
              / (this.getColumn2Datas.maximumVideoView
                + this.getColumn1Datas.maximumVideoView),
          ),
          x: this.$options.filters.numberWithSpace(
            this.getColumn2Datas.maximumVideoView,
          ),

          color: '#3f78de',
        },
      ];
      return newOptions;
    },
    averageChartOptions() {
      const newOptions = { ...this.options3 };

      const averageViewCount = Math.max(
        this.getColumn2Datas.averageViewCount,
        this.getColumn1Datas.averageViewCount,
      );

      newOptions.series[0].name = 'Moyenne du nombre de vues';
      newOptions.series[0].data = [
        {
          radius: '112%',
          innerRadius: '102%',
          y: Math.floor(
            (this.getColumn1Datas.averageViewCount * 100)
              / (this.getColumn2Datas.averageViewCount
                + this.getColumn1Datas.averageViewCount),
          ),
          x: this.$options.filters.numberWithSpace(
            this.getColumn1Datas.averageViewCount,
          ),
          color: '#de543f',
        },
      ];

      newOptions.series[1].name = 'Moyenne du nombre de vues';
      newOptions.series[1].data = [
        {
          radius: '101%',
          innerRadius: '91%',
          y: Math.floor(
            (this.getColumn2Datas.averageViewCount * 100)
              / (this.getColumn2Datas.averageViewCount
                + this.getColumn1Datas.averageViewCount),
          ),
          x: this.$options.filters.numberWithSpace(
            this.getColumn2Datas.averageViewCount,
          ),
          color: '#3f78de',
        },
      ];
      return newOptions;
    },
    ...mapGetters([
      'getColumn1Selection',
      'getColumn2Selection',
      'getColumn1Datas',
      'getColumn2Datas',
      'getCompare',
    ]),
  },
  methods: {
    toggleCompare() {
      this.$store.dispatch('toggleCompare');
    },
    enter(el, done) {
      const tl = new TimelineLite({
        onComplete: done,
      });

      tl.fromTo(
        this.$refs.title.$el,
        0.5,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1 },
        0.1,
      );
      tl.fromTo(
        this.$refs.left,
        0.26,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1 },
        0.5,
      );

      tl.fromTo(
        this.$refs.right,
        0.26,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1 },
        0.5,
      );

      tl.fromTo(
        this.$refs.center1.$el,
        0.5,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1 },
        0.7,
      );
      tl.fromTo(
        this.$refs.center2.$el,
        0.5,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1 },
        0.8,
      );
      tl.fromTo(
        this.$refs.center3.$el,
        0.5,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1 },
        0.9,
      );
    },
    leave(el, done) {
      const tl = new TimelineLite({
        onComplete: done,
      });

      tl.fromTo(
        this.$refs.title.$el,
        0.5,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0 },
        0.4,
      );
      tl.fromTo(
        this.$refs.left,
        0.26,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0 },
        0.5,
      );

      tl.fromTo(
        this.$refs.right,
        0.26,
        { x: 0, opacity: 1 },
        { x: 100, opacity: 0 },
        0.5,
      );

      tl.fromTo(
        this.$refs.center1.$el,
        0.26,
        { scale: 1, opacity: 1 },
        { scale: 0, opacity: 0 },
        0.3,
      );
      tl.fromTo(
        this.$refs.center2.$el,
        0.26,
        { scale: 1, opacity: 1 },
        { scale: 0, opacity: 0 },
        0.2,
      );
      tl.fromTo(
        this.$refs.center3.$el,
        0.26,
        { scale: 1, opacity: 1 },
        { scale: 0, opacity: 0 },
        0.1,
      );
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-areas:
    "a a a"
    "b c d";
  grid-template-columns: 1fr minmax(500px, auto) 1fr;
  grid-template-rows: max-content auto;
  align-items: center;
  height: calc(100vh - 65px - 12vh);
  z-index: 3;
  position: relative;

  .section_title {
    grid-area: a;
  }

  &__center {
    grid-area: c;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  &__right {
    grid-area: d;
  }

  &__left {
    grid-area: b;
  }

  &__right,
  &__left {
    display: flex;
    flex-flow: column wrap;
  }
}

.slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-enter,
  &-leave-to {
    transform: translateX(25px);
    opacity: 0;
  }
}
</style>
