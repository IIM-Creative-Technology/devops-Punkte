<template>
  <div class="grid">
    <section-title
      ref="title"
      v-parallax="0.1"
      class="section_title"
      title="Like/Dislike"
      edito="Comprenez ce que les internautes aiment ou n’aiment pas."
    />
    <div class="grid__left" ref="left" v-parallax="0.2">
      <likes-stats
        :likes="{ min: minLikes(1), max: maxLikes(1) }"
        :dislikes="{ min: minDislikes(1), max: maxDislikes(1) }"
      />
    </div>

    <div v-parallax="0.3" ref="center" class="grid__center">
      <h2>Likes</h2>
      <gauge-comparator
        :showBoth="$store.state.compare"
        title="Vidéo avec le plus de likes"
        :percentages="percentages('maxLikes')"
      />
      <gauge-comparator
        :showBoth="$store.state.compare"
        title="Vidéo avec le moins de likes"
        :percentages="percentages('minLikes')"
      />
      <h2>Dislikes</h2>
      <gauge-comparator
        :showBoth="$store.state.compare"
        title="Vidéo avec le plus de dislikes"
        :percentages="percentages('maxDislikes')"
      />
      <gauge-comparator
        :showBoth="$store.state.compare"
        title="Vidéo avec le moins de dislikes"
        :percentages="percentages('minDislikes')"
      />
    </div>

    <div class="grid__right" ref="right" v-parallax="0.2">
      <transition name="slide-fade" v-if="$store.state.compare">
        <likes-stats
          :likes="{ min: minLikes(2), max: maxLikes(2) }"
          :dislikes="{ min: minDislikes(2), max: maxDislikes(2) }"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import gaugeComparator from '@/components/GaugeComparator.vue';
import likesStats from '@/components/LikesStats.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import { TimelineLite } from 'gsap';
import { api } from '@/api';

export default {
  components: { gaugeComparator, likesStats, SectionTitle },
  computed: {
    column1Selection() {
      return this.$store.getters.getColumn1Selection;
    },
    column2Selection() {
      return this.$store.getters.getColumn2Selection;
    },
    minLikes() {
      return statsSide => this.$store.getters.getMinLikes(statsSide);
    },
    maxLikes() {
      return statsSide => this.$store.getters.getMaxLikes(statsSide);
    },
    minDislikes() {
      return statsSide => this.$store.getters.getMinDislikes(statsSide);
    },
    maxDislikes() {
      return statsSide => this.$store.getters.getMaxDislikes(statsSide);
    },
    percentages() {
      return (type) => {
        const side1 = this[type](1);
        const side2 = this[type](2);
        const higherSide = Math.max(side1, side2);
        const lowerSide = Math.min(side1, side2);
        const total = higherSide + lowerSide;
        return [(side1 / (total || 1)) * 100, (side2 / (total || 1)) * 100];
      };
    },
  },
  methods: {
    async updateLikeData(value, statsSide) {
      const datas = (await api.fetchVideosLikes(
        value.country,
        value.category,
        this.$store.state[`column${statsSide}`].selected.range,
      )).data;
      let maxLikes = 0;
      let minLikes = datas.length ? datas[0].likeCount : 0;
      let maxDislikes = 0;
      let minDislikes = datas.length ? datas[0].dislikeCount : 0;
      datas.forEach((data) => {
        const { likeCount } = data;
        const { dislikeCount } = data;
        if (likeCount > maxLikes) {
          maxLikes = likeCount;
        }
        if (likeCount < minLikes) {
          minLikes = likeCount;
        }
        if (dislikeCount > maxDislikes) {
          maxDislikes = dislikeCount;
        }
        if (dislikeCount < minDislikes) {
          minDislikes = dislikeCount;
        }
      });
      this.$store.commit('setMinLikes', { statsSide, value: minLikes });
      this.$store.commit('setMaxLikes', { statsSide, value: maxLikes });
      this.$store.commit('setMinDislikes', { statsSide, value: minDislikes });
      this.$store.commit('setMaxDislikes', { statsSide, value: maxDislikes });
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
    this.updateLikeData(this.$store.state.column1.selected, 1);
    this.updateLikeData(this.$store.state.column2.selected, 2);
  },
  watch: {
    column1Selection: {
      async handler(value) {
        await this.updateLikeData(value, 1);
      },
      deep: true,
    },
    column2Selection: {
      async handler(value) {
        await this.updateLikeData(value, 2);
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
</style>
