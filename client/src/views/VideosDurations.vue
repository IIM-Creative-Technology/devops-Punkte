<template>
  <div class="grid">
    <section-title
      ref="title"
      v-parallax="0.1"
      class="section_title"
      title="Durée des vidéos"
      edito="Découvrez la durée idéale des vidéos pour cette recherche."
    />

    <div class="grid__left" ref="left" v-parallax="0.2">
      <video-duration-stats :statsSide="1"/>
    </div>

    <div v-parallax="0.3" ref="center" class="grid__center">
      <video-duration-charts
        :title="maxDurationTitle"
        :durations="maxVideoDurations"
        :videoTitles="longestVideos"
        :statSize="statSize"
      />
      <video-duration-charts
        :title="averageDurationTitle"
        :durations="averageVideoDurations"
        :statSize="statSize"
      />
      <video-duration-charts
        :title="minDurationTitle"
        :durations="minVideoDurations"
        :videoTitles="shortestVideos"
        :statSize="statSize"
      />
      <div class="statRulers">
        <div class="statRuler" v-for="i in 8" v-bind:key="i">
          <div class="statRulerMark"></div>
          <p class="statRulerText">{{ rulerTime(i) }}</p>
        </div>
      </div>
    </div>

    <div class="grid__right" ref="right" v-parallax="0.2">
      <transition name="slide-fade" v-if="$store.state.compare">
        <video-duration-stats :statsSide="2"/>
      </transition>
    </div>
  </div>
</template>

<script>
import videoDurationStats from '@/components/VideoDurationStats';
import videoDurationCharts from '@/components/VideoDurationCharts';
import SectionTitle from '@/components/SectionTitle.vue';
import { api } from '@/api';
import { mapGetters } from 'vuex';

export default {
  components: { videoDurationStats, videoDurationCharts, SectionTitle },
  data() {
    return {
      maxDurationTitle: 'Durée de la vidéo la plus longue',
      averageDurationTitle: 'Durée moyenne des vidéos',
      minDurationTitle: 'Durée de la vidéo la plus courte',
    };
  },
  computed: {
    ...mapGetters({
      maxVideoDurations: 'getMaxVideoDurations',
      minVideoDurations: 'getMinVideoDurations',
      averageVideoDurations: 'getAverageVideoDurations',
      longestVideos: 'getLongestVideos',
      shortestVideos: 'getShortestVideos',
    }),
    column1Selection() {
      return this.$store.getters.getColumn1Selection;
    },
    column2Selection() {
      return this.$store.getters.getColumn2Selection;
    },
    highestValue() {
      const maxDuration1 = this.maxVideoDurations[0];
      const maxDuration2 = this.maxVideoDurations[1];
      return maxDuration1 > maxDuration2 ? maxDuration1 : maxDuration2;
    },
    rulerTime() {
      return (index) => {
        const value = (this.statSize / 8) * index;
        const h = Math.floor(value / 60 / 60);
        const m = Math.floor((value / 60) % 60);
        const s = value % 60;
        return (
          (h ? `${h}h` : '')
          + (m || h ? `${m}m` : '')
          + (s || m || h ? `${s}s` : '')
        );
      };
    },
    statSize() {
      const ceiledHighestValue = Math.ceil(this.highestValue / 8);
      const statSize = (ceiledHighestValue % 2 ? ceiledHighestValue + 1 : ceiledHighestValue)
        * 8;
      return statSize;
    },
  },
  methods: {
    async updateDurationData(value, statsSide) {
      const datas = (await api.fetchVideosDurations(
        value.country,
        value.category,
        this.$store.state[`column${statsSide}`].selected.range,
      )).data;
      let maxDuration = 0;
      let longestVideo = '';
      let averageDuration = 0;
      let minDuration = datas.length ? datas[0].duration : 0;
      let shortestVideo = datas.length ? datas[0].title : '';
      let totalDuration = 0;
      let videoId = '';
      datas.forEach((data) => {
        const { id, duration, title } = data;
        if (duration > maxDuration) {
          maxDuration = duration;
          longestVideo = title;
          videoId = id;
        }
        if (duration < minDuration) {
          minDuration = duration;
          shortestVideo = title;
        }
        totalDuration += duration;
      });
      averageDuration = Math.round(totalDuration / datas.length);
      this.$store.commit('setMaxVideoDuration', {
        statsSide,
        value: maxDuration,
      });
      this.$store.commit('setAverageVideoDuration', {
        statsSide,
        value: averageDuration,
      });
      this.$store.commit('setMinVideoDuration', {
        statsSide,
        value: minDuration,
      });
      this.$store.commit('setLongestVideo', { statsSide, value: longestVideo });
      this.$store.commit('setShortestVideo', {
        statsSide,
        value: shortestVideo,
      });
      this.$store.commit('setVideoId', { statsSide, value: videoId });
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
  mounted() {
    this.updateDurationData(this.$store.state.column1.selected, 1);
    this.updateDurationData(this.$store.state.column2.selected, 2);
  },
  watch: {
    column1Selection: {
      async handler(value) {
        await this.updateDurationData(value, 1);
      },
      deep: true,
    },
    column2Selection: {
      async handler(value) {
        await this.updateDurationData(value, 2);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas:
    "a a a"
    "b c d";
  grid-template-columns: 1fr minmax(700px, auto) 1fr;
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
    flex-direction: column;
    position: relative;

    .statRulers {
      position: absolute;
      color: gray;
      font-size: 12px;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(1fr);
      top: 20px;
      left: 0;
      z-index: -100;
      width: 100%;
      height: 100%;

      .statRuler {
        height: 100%;
        &Mark {
          height: 110%;
          border-left: 1px solid #eee;
        }

        &Text {
          margin-top: 5px;
        }
      }
    }
  }

  &__right {
    grid-area: d;
    text-align: right;
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
