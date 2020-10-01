<template>
  <div>
    <div class="grid">
      <section-title
        ref="title"
        v-parallax="0.1"
        class="section_title"
        title="Nombres de publications"
        edito="Ayez une vision sur l’ensemble des contenus publiés en fonction des jours de la semaine."
      />
      <div class="grid__left" ref="left" v-parallax="0.2">
        <div class="information__container">
          <home-block
            v-for="(block, i) in column1"
            :key="i"
            :title="block.name"
            :value="block.value"
            :important="block.important"
            :type="block.type"
          />
        </div>
      </div>
      <div class="grid__center" ref="center" v-parallax="0.3">
        <div class="grid__center-chart-container">
          <transition name="fade">
            <bar-chart
              v-if="
              barChart &&
              getColumn1Datas.numberOfPublicationByDay !== undefined &&
              $store.state.column2.datas.numberOfPublicationByDay &&
              !$store.state.isLoading"
            />
          </transition>
          <high-charts :options="chartOptions" v-if="!barChart"/>
        </div>
        <div class="btn-outline" @click="toggleBarchart" style="margin-top: 40px;">
          <span>
            {{ barChart ? 'Par tranche horaire' : 'Par jour'}}
            <tranche-horaire-icon/>
          </span>
        </div>
      </div>
      <div class="grid__right" ref="right" v-parallax="0.2">
        <div class="information__container">
          <home-block
            v-for="(block, i) in column2"
            :key="i"
            :title="block.name"
            :value="block.value"
            :important="block.important"
            :type="block.type"
            :alignRight="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import HighCharts from '@/components/HighCharts.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import { mapGetters } from 'vuex';
import HomeBlock from '@/components/HomeBlock.vue';
import toggleIcon from '@/assets/group-7@2x.png';
import Utils from '@/mixins/Utils.vue';
import TrancheHoraireIcon from '@/assets/tranche-horaire-icon.vue';

export default {
  mixins: [Utils],
  data() {
    return {
      barChart: true,
      hcOptions: {
        title: {
          text: undefined,
        },
        chart: {
          type: 'line',
          style: {
            fontFamily: '"Geomanist", sans-serif',
          },
        },
        xAxis: {
          categories: [
            'Minuit - 4h',
            '4h - 8h',
            '8h - 12h',
            '12h - 16h',
            '16h - 20h',
            '20h - Minuit',
          ],
        },
        yAxis: {
          title: {
            text: 'Nombre de publications',
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        legend: {
          text: undefined,
        },
        series: [
          {
            data: [],
            color: '#ee5355',
            name: '',
          },
          {
            data: [],
            color: '#3f78de',
            name: '',
          },
        ],
      },
    };
  },
  components: {
    BarChart,
    HighCharts,
    HomeBlock,
    SectionTitle,
    TrancheHoraireIcon,
  },
  methods: {
    toggleBarchart() {
      this.barChart = !this.barChart;
    },
    capitalizeFirstletter(value = 'string') {
      const newValue = value.toString();
      return newValue.charAt(0).toUpperCase() + newValue.slice(1);
    },
    getColumnPublicationMin(i, key) {
      const array = this[`getColumn${i}Datas`][key] || [];
      return array.find(
        element => element.value
          === Math.min(...this[`getColumn${i}Datas`][key].map(el => el.value)),
      );
    },
    getColumnPublicationMax(i, key) {
      const array = this[`getColumn${i}Datas`][key] || [];
      return array.find(
        element => element.value
          === Math.max(...this[`getColumn${i}Datas`][key].map(el => el.value)),
      );
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
        this.$refs.center,
        0.26,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1 },
        0.7,
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
        0.24,
      );
      tl.fromTo(
        this.$refs.left,
        0.26,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0 },
        0.26,
      );

      tl.fromTo(
        this.$refs.right,
        0.26,
        { x: 0, opacity: 1 },
        { x: 100, opacity: 0 },
        0.26,
      );

      tl.fromTo(
        this.$refs.center,
        0.26,
        { scale: 1, opacity: 1 },
        { scale: 0, opacity: 0 },
        0.1,
      );
    },
  },
  computed: {
    ...mapGetters(['getColumn1Datas', 'getColumn2Datas']),
    column1() {
      if (
        this.barChart
        && this.getColumn1Datas.numberOfPublicationByDay !== undefined
      ) {
        const label = this.getColumn1Datas.bestNumberOfPublication.label || '';
        const label2 = this.worstDaysOfPublication[0];
        let { value } = this.getColumn1Datas.bestNumberOfPublication;
        value += value > 1 ? ' publications' : ' publication';
        let value2 = label2.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        return [
          {
            name: 'Jour où le nombre de publication est le plus élevée',
            value: `
          ${this.capitalizeFirstletter(label)} (${value})`,
            type: 'string',
            important: false,
          },
          {
            name: 'Jour où le nombre de publication est le moins élevée',
            value: `${this.capitalizeFirstletter(label2.label)} (${value2})`,
            type: 'string',
            important: false,
          },
        ];
      }
      if (this.getColumn1Datas.bestTimeOfPublication !== undefined) {
        const bestTime = this.bestTimeOfPublication[0];
        let { value } = bestTime;
        const { label } = bestTime;
        value += value > 1 ? ' publications' : ' publication';
        const worstTime = this.worstTimeOfPublication[0];
        let value2 = worstTime.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        const label2 = worstTime.label;
        return [
          {
            name: 'Horaire où le nombre de publication est le plus élevée',
            value: `
          ${this.capitalizeFirstletter(label)} (${value})
          `,
            type: 'string',
            important: false,
          },
          {
            name: 'Horaire où le nombre de publication est le moins élevée',
            value: `
          ${this.capitalizeFirstletter(label2)} (${value2})
          `,
            type: 'string',
            important: false,
          },
        ];
      }
      return [
        {
          name: '',
          value: '',
          type: 'string',
          important: false,
        },
      ];
    },
    column2() {
      if (
        this.barChart
        && this.getColumn2Datas.bestNumberOfPublication !== undefined
      ) {
        const label = this.getColumn2Datas.bestNumberOfPublication.label || '';
        const label2 = this.worstDaysOfPublication[1];
        let { value } = this.getColumn2Datas.bestNumberOfPublication;
        value += value > 1 ? ' publications' : ' publication';
        let value2 = label2.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        return [
          {
            name: 'Jour où le nombre de publication est le plus élevée',
            value: `
          ${this.capitalizeFirstletter(label)} (${value})
          `,
            type: 'string',
            important: false,
          },
          {
            name: 'Jour où le nombre de publication est le moins élevée',
            value: `${this.capitalizeFirstletter(label2.label)} (${value2})`,
            type: 'string',
            important: false,
          },
        ];
      }
      if (this.getColumn2Datas.numberOfPublicationByDay !== undefined) {
        const bestTime = this.bestTimeOfPublication[1];
        let { value } = bestTime;
        const { label } = bestTime;
        value += value > 1 ? ' publications' : ' publication';
        const worstTime = this.worstTimeOfPublication[1];
        let value2 = worstTime.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        const label2 = worstTime.label;
        return [
          {
            name: 'Horaire où le nombre de publication est le plus élevée',
            value: `
          ${this.capitalizeFirstletter(label)} (${value})
          `,
            type: 'string',
            important: false,
          },
          {
            name: 'Horaire où le nombre de publication est le moins élevée',
            value: `
          ${this.capitalizeFirstletter(label2)} (${value2})
          `,
            type: 'string',
            important: false,
          },
        ];
      }
      return [
        {
          name: '',
          value: '',
          type: 'string',
          important: false,
        },
      ];
    },
    worstDaysOfPublication() {
      const min1 = this.getColumnPublicationMin(1, 'numberOfPublicationByDay');
      const min2 = this.getColumnPublicationMin(2, 'numberOfPublicationByDay');
      return [min1, min2];
    },
    schedules() {
      const tab1 = this.chunkArray(
        this.getColumn1Datas.timeOfPublication,
        8,
      ).map(tab => tab.reduce((prev, next) => prev + next.value, 0));
      const tab2 = this.chunkArray(
        this.getColumn2Datas.timeOfPublication,
        8,
      ).map(tab => tab.reduce((prev, next) => prev + next.value, 0));
      return [tab1, tab2] || [];
    },
    chartOptions() {
      const newOptions = { ...this.hcOptions };
      newOptions.series[0].data = [...this.schedules[0]];
      newOptions.series[1].data = [...this.schedules[1]];
      return { ...newOptions };
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-outline {
  position: relative;
  img {
    transform: rotate(0deg);
    transition: transform 0.5s ease;
  }
  &:active img {
    transform: rotate(-90deg);
  }
  &:hover {
    svg {
      position: relative;
      z-index: 990;
    }
    #flechefill {
      fill: #fff;
    }
  }
}
.grid__center {
  &-chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 700px;
    min-height: 500px;
  }
  display: block;
}

.toggleIcon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  display: inline-block;
  vertical-align: middle;
}
.fade {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  &-enter-active,
  &-leave-active {
    position: absolute;
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-enter,
  &-leave-to {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    opacity: 0;
  }
}
</style>
