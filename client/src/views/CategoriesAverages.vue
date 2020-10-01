<template>
  <div class="grid">
    <section-title
      ref="title"
      v-parallax="0.1"
      class="section_title"
      title="Moyenne des catégories"
      edito="Nous vous affichons une moyenne des informations principales pour cette recherche."
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

    <div class="grid__center" ref="center">
      <high-charts v-parallax="0.3" :options="chartOptions"/>
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
import HighCharts from '@/components/HighCharts.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import { mapGetters } from 'vuex';
import Utils from '@/mixins/Utils.vue';
import { TimelineLite } from 'gsap';

export default {
  mixins: [Utils],
  components: {
    HighCharts,
    HomeBlock,
    SectionTitle,
  },
  data() {
    return {
      models: [
        {
          title: 'Nombre de vues',
          value: 'averageViewCount',
          type: 'string',
          important: false,
        },
        {
          title: 'Durée moyenne des vidéos',
          value: 'averageTime',
          type: 'string',
          important: false,
        },
        {
          title: 'Meilleur moment de publication',
          value: 'bestNumberOfPublication',
          type: 'object',
          important: false,
        },
        {
          title: 'Meilleur moment de publication',
          value: 'bestTimeOfPublication',
          type: 'object',
          important: false,
        },
        {
          title: 'Likes / Dislike',
          value: 'likePourcentage',
          type: 'string',
          important: false,
        },
        {
          title: 'Tags les plus utilisés',
          value: 'bestTags',
          type: 'array',
          important: false,
        },
      ],
      options: {
        title: {
          text: undefined,
        },
        chart: {
          opacity: 1,
          clip: false,
          margin: [0, 0, 0, 0],
          width: null,
          height: '95%',
          polar: true,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        xAxis: [
          {
            type: 'category',
            categories: ['Nombre de vue', 'Like', 'Durée', 'Dislike'],
            labels: {
              style: {
                color: '#151515',
                cursor: 'default',
                fontSize: '13px',
                textOverflow: 'none',
                whiteSpace: 'nowrap',
                fontFamily: 'Josefin Sans',
                letterSpacing: '0.1px',
              },
            },
            tickColor: '#FF0000',
            tickPosition: 'inside',
            tickmarkPlacement: 'on',
            tickPixelInterval: 45,
            gridLineColor: '#ddd',
            lineColor: '#ddd',
          },
        ],
        yAxis: {
          gridLineColor: '#ddd',
          gridLineWidth: 0,
          labels: {
            enabled: false,
          },
          max: 100,
        },
        series: [
          {
            color: '#ee5355',
            fillOpacity: 0.65,
            name: 'Column',
            data: [],
            pointPlacement: 'on',
            lineWidth: 3,
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'area',
            marker: false,
          },
          {
            color: '#3f78de',
            fillOpacity: 0.65,
            name: 'Column2',
            pointPlacement: 'on',
            lineWidth: 3,
            data: [],
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'area',
            marker: false,
            animation: {
              duration: 1000,
            },
          },
        ],
      },
    };
  },
  computed: {
    column1() {
      return this.models.map(model => ({
        ...model,
        value:
          model.title === 'Durée moyenne des vidéos'
            ? this.getFormattedTime(this.getColumn1Datas[model.value])
            : this.getColumn1Datas[model.value],
      }));
    },
    column2() {
      return this.models.map(model => ({
        ...model,
        value:
          model.title === 'Durée moyenne des vidéos'
            ? this.getFormattedTime(this.getColumn2Datas[model.value])
            : this.getColumn2Datas[model.value],
      }));
    },
    averageData1() {
      const maxView = Math.max(
        this.getColumn2Datas.averageViewCount,
        this.getColumn1Datas.averageViewCount,
      );
      const maxAverageTime = Math.max(
        this.getColumn2Datas.averageTime,
        this.getColumn1Datas.averageTime,
      );
      const maxLike = Math.max(
        this.getColumn2Datas.likePourcentage,
        this.getColumn1Datas.likePourcentage,
      );
      const maxDislike = Math.max(
        this.getColumn2Datas.dislikePourcentage,
        this.getColumn1Datas.dislikePourcentage,
      );

      return [
        Math.round((this.getColumn1Datas.averageViewCount * 100) / (this.getColumn1Datas.averageViewCount + this.getColumn2Datas.averageViewCount)),
        Math.round((this.getColumn1Datas.likePourcentage * 100) / (this.getColumn1Datas.likePourcentage + this.getColumn2Datas.likePourcentage)),
        Math.round((this.getColumn1Datas.averageTime * 100) / (this.getColumn1Datas.averageTime + this.getColumn2Datas.averageTime)),
        Math.round((this.getColumn1Datas.dislikePourcentage * 100) / (this.getColumn1Datas.dislikePourcentage + this.getColumn2Datas.dislikePourcentage)),
      ];
    },
    averageData2() {
      const maxView = Math.max(
        this.getColumn2Datas.averageViewCount,
        this.getColumn1Datas.averageViewCount,
      );
      const maxAverageTime = Math.max(
        this.getColumn2Datas.averageTime,
        this.getColumn1Datas.averageTime,
      );
      const maxLike = Math.max(
        this.getColumn2Datas.likePourcentage,
        this.getColumn1Datas.likePourcentage,
      );
      const maxDislike = Math.max(
        this.getColumn2Datas.dislikePourcentage,
        this.getColumn1Datas.dislikePourcentage,
      );
      return [
        Math.round((this.getColumn2Datas.averageViewCount * 100) / (this.getColumn1Datas.averageViewCount + this.getColumn2Datas.averageViewCount)),
        Math.round((this.getColumn2Datas.likePourcentage * 100) / (this.getColumn1Datas.likePourcentage + this.getColumn2Datas.likePourcentage)),
        Math.round((this.getColumn2Datas.averageTime * 100) / (this.getColumn1Datas.averageTime + this.getColumn2Datas.averageTime)),
        Math.round((this.getColumn2Datas.dislikePourcentage * 100) / (this.getColumn1Datas.dislikePourcentage + this.getColumn2Datas.dislikePourcentage)),
      ];
    },
    chartOptions() {
      const newOptions = { ...this.options };
      newOptions.series[0].data = [...this.averageData1];
      if (this.getCompare) {
        newOptions.series[1].data = [...this.averageData2];
        newOptions.series[1].lineWidth = 3;
      } else {
        newOptions.series[1].data = [0, 0, 0, 0];
        newOptions.series[1].lineWidth = 0;
      }
      return { ...newOptions };
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
    getFormattedTime(time) {
      const h = Math.floor(time / 60 / 60);
      const m = Math.floor((time / 60) % 60);
      const s = time % 60;
      return (
        (h ? `${h}h` : '')
        + (m || h ? `${m}m` : '')
        + (s || m || h ? `${s}s` : '')
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
