<template>
  <div class="videoDurationStats">
    <div class="videoDurationStat">
      <h3 class="videoDurationStatTitle">Durée max des vidéos</h3>
      <p class="videoDurationStatValue">{{ valueString(maxVideoDuration) }}</p>
    </div>
    <div class="videoDurationStat">
      <h3 class="videoDurationStatTitle">Durée moyenne des vidéos</h3>
      <p class="videoDurationStatValue">{{ valueString(averageVideoDuration) }}</p>
    </div>
    <div class="videoDurationStat">
      <h3 class="videoDurationStatTitle">Durée min des vidéos</h3>
      <p class="videoDurationStatValue">{{ valueString(minVideoDuration) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statsSide: Number,
  },
  computed: {
    valueString() {
      return (value) => {
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
    maxVideoDuration() {
      return this.$store.getters.getMaxVideoDuration(this.statsSide);
    },
    minVideoDuration() {
      return this.$store.getters.getMinVideoDuration(this.statsSide);
    },
    averageVideoDuration() {
      return this.$store.getters.getAverageVideoDuration(this.statsSide);
    },
  },
};
</script>

<style lang="scss">
.videoDurationStats {
  .videoDurationStat {
    margin-bottom: 40px;
    &Title {
      margin: 0 0 5px 0;
      color: #aaa;
      font-weight: normal;
      font-size: 16px;
    }

    &Value {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }
  }
}
</style>
