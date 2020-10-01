<template>
  <div class="channel">
    <div class="channel__row">
      <span class="channel__row-number">0{{ index }}.</span>
    </div>
    <div class="channel__image">
      <h2>{{ $store.getters.getYoutubers(statsSide)[index].title }}</h2>
    </div>
    <div class="channel__infos" v-parallax="0.1">      
      <div class="channel__infos__bar">
        <div class="channel__infos__bar-progress" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width:30%">
          {{ $store.getters.getYoutubers(statsSide)[index].subscriberCount | numberWithSpace }} abonnés
        </div>
      </div>
      
      <div class="channel__infos__bar">
        <div class="channel__infos__bar-progress" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style="width:67%">
          {{ $store.getters.getYoutubers(statsSide)[index].likePercentage }}% de likes
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Youtubers from "@/views/Youtubers.vue";

export default {
  components: {
    Youtubers,
  },
  props: {
    index: Number,
    statsSide: Number
  }
}
</script>

<style lang="scss" scoped>
$lightblue:#9dc3ff;
$darkblue:#3f78de;
$lightred:#ffbdb3;
$darkred:#de543f;
.channel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
        &__row {
            margin:auto;
            font-weight: bold;
            font-size: 50px;
            color:$darkred;
        }
        &__image {
            width: 150px;
            height: 100px;
            margin: auto;
            img {
                width: 100%;
                border-radius: 50%;
            }
        }
        &__infos {
            
            &__bar {
                margin-bottom: 8px;
                width: 228px;
                height: 24px;
                background-color: $lightred;
                
                &-progress {
                    height: 100%;
                    background-color: $darkred;
                    color: white;
                    padding: 5px;
                    white-space: nowrap;
                }
            }
        }
}
.youtubers__container-right {
    &.channel {
        flex-direction: row-reverse;
  text-align: right;

    }
    .channel {
        &__row {
            color: $darkblue;
        }

        &__infos {
            &__bar {
                background-color: $lightblue;
                
                &-progress {
                    background-color: $darkblue;
                }
            }
        }
        &__image {
          text-align: right;
        }
    }
}
</style>
