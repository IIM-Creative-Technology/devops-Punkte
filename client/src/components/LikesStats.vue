<template>
  <div class="likesStats">
    <div class="likesStatsItem">
      <h2 class="likesStatsItemTitle">Vidéo avec le plus de likes</h2>
      <p class="likesStatsItemValue">{{ likes.max | numberWithSpace }} likes</p>
    </div>
    <div class="likesStatsItem">
      <h2 class="likesStatsItemTitle">Vidéo avec le moins de likes</h2>
      <p class="likesStatsItemValue">{{ likes.min | numberWithSpace }} likes</p>
    </div>
    <div class="likesStatsItem">
      <h2 class="likesStatsItemTitle">Vidéos avec le plus de dislikes</h2>
      <p class="likesStatsItemValue">{{ dislikes.max | numberWithSpace }} dislikes</p>
    </div>
    <div class="likesStatsItem">
      <h2 class="likesStatsItemTitle">Vidéos avec le moins de dislikes</h2>
      <p class="likesStatsItemValue">{{ dislikes.min | numberWithSpace }} dislikes</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    likes: {
      type: Object,
      default: () => ({ min: 0, max: 0 })
    },
    dislikes: {
      type: Object,
      default: () => ({ min: 0, max: 0 })
    }
  }
}
</script>

<style lang="scss">
.likesStats {
  &Item {
    &Title {
      font-size: 16px;
      color: #AAA;
    }

    &Value {
      margin: 0 0 50px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
