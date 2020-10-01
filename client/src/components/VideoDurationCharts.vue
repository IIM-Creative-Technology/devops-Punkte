<template>
  <div>
    <h2 class="statTitle">{{ title }}</h2>
    <div class="statBlocks">
      <div class="statBlock1" :style="statBlockStyle(0)">
        <p class="statText"><a class="statTextLink" :href="'https://www.youtube.com/watch?v=' + $store.state.stats1.id">{{ videoTitles[0] }}</a></p>
      </div>
      <div class="statBlock2" :style="statBlockStyle(1)">
        <p class="statText"><a class="statTextLink" :href="'https://www.youtube.com/watch?v=' + $store.state.stats2.id">{{ videoTitles[1] }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoDurationCharts',
  props: {
    title: String,
    durations: {
      type: Array,
      default: () => ([])
    },
    videoTitles: {
      type: Array,
      default: () => ([])
    },
    statSize: Number
  },
  computed: {
    percentageSize() {
      return value => parseInt((100 / (this.statSize || 1)) * (value || 0)) || 0.2;
    },
    statBlockStyle () {
      return index => ({ width: this.percentageSize(this.durations[index]) + '%' })
    }
  }
}
</script>

<style lang="scss">
.statTitle {
  margin: 50px 0 10px 10px;
}

.statBlocks {
  .statBlock1,
  .statBlock2 {
    height: 32px;
    text-align: right;

    .statText {
      padding: 8px 15px 0 15px;
      white-space: nowrap;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      color: white;

      &Link {
        color: white;
        text-decoration: none;
      }
    }
  }

  .statBlock1 {
    background: rgba(255, 158, 143, 1);
    background: -moz-linear-gradient(
      left,
      rgba(255, 158, 143, 1) 0%,
      rgba(222, 84, 63, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      right top,
      color-stop(0%, rgba(255, 158, 143, 1)),
      color-stop(100%, rgba(222, 84, 63, 1))
    );
    background: -webkit-linear-gradient(
      left,
      rgba(255, 158, 143, 1) 0%,
      rgba(222, 84, 63, 1) 100%
    );
    background: -o-linear-gradient(
      left,
      rgba(255, 158, 143, 1) 0%,
      rgba(222, 84, 63, 1) 100%
    );
    background: -ms-linear-gradient(
      left,
      rgba(255, 158, 143, 1) 0%,
      rgba(222, 84, 63, 1) 100%
    );
    background: linear-gradient(
      to right,
      rgba(255, 158, 143, 1) 0%,
      rgba(222, 84, 63, 1) 100%
    );
    margin-bottom: 4px;
  }

  .statBlock2 {
    background: rgba(157, 195, 255, 1);
    background: -moz-linear-gradient(
      left,
      rgba(157, 195, 255, 1) 0%,
      rgba(63, 121, 222, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      right top,
      color-stop(0%, rgba(157, 195, 255, 1)),
      color-stop(100%, rgba(63, 121, 222, 1))
    );
    background: -webkit-linear-gradient(
      left,
      rgba(157, 195, 255, 1) 0%,
      rgba(63, 121, 222, 1) 100%
    );
    background: -o-linear-gradient(
      left,
      rgba(157, 195, 255, 1) 0%,
      rgba(63, 121, 222, 1) 100%
    );
    background: -ms-linear-gradient(
      left,
      rgba(157, 195, 255, 1) 0%,
      rgba(63, 121, 222, 1) 100%
    );
    background: linear-gradient(
      to right,
      rgba(157, 195, 255, 1) 0%,
      rgba(63, 121, 222, 1) 100%
    );
  }
}
</style>
