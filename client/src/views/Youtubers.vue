<template>
  <div class="youtubers" v-parallax="0.2">
    <h1 class="youtubers__title">Chaîne youtube</h1>
    <div class="youtubers__container" v-parallax="0.1">
      <div class="youtubers__container-left">
        <channels :statsSide="1" :index="0"/>
        <channels :statsSide="1" :index="1"/>
        <channels :statsSide="1" :index="2"/>
      </div>
      <div class="youtubers__container-right" v-if="$store.state.compare === true">
        <channels :statsSide="2" :index="0"/>
        <channels :statsSide="2" :index="1"/>
        <channels :statsSide="2" :index="2"/>
      </div>
    </div>
  </div>
</template>

<script>
import Channels from '@/components/Channels.vue';
import { api } from '@/api';
import SectionTitle from '@/components/SectionTitle.vue';

export default {
  components: {
    Channels,
    SectionTitle,
  },
  methods: {
    async updateData(value, statsSide) {
      const datas = (await api.fetchYoutubers(
        value.country,
        value.category,
        this.$store.state[`column${statsSide}`].selected.range,
      )).data;
      this.$store.commit('setYoutuber', {
        statsSide,
        value: datas[0],
        index: 0,
      });
      this.$store.commit('setYoutuber', {
        statsSide,
        value: datas[1],
        index: 1,
      });
      this.$store.commit('setYoutuber', {
        statsSide,
        value: datas[2],
        index: 2,
      });
    },
  },
  async mounted() {
    this.updateData(this.$store.state.column1.selected, 1);
    this.updateData(this.$store.state.column2.selected, 2);
  },
  computed: {
    column1Selection() {
      return this.$store.getters.getColumn1Selection;
    },
    column2Selection() {
      return this.$store.getters.getColumn2Selection;
    },
  },
  watch: {
    column1Selection: {
      async handler(value) {
        await this.updateData(value, 1);
      },
      deep: true,
    },
    column2Selection: {
      async handler(value) {
        await this.updateData(value, 2);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.youtubers {
  &__title {
    font-size: 28px;
    letter-spacing: -0.8px;
    line-height: 1.21;
    font-weight: bold;
    margin-top: 80px;
    margin-bottom: 50px;
  }
  &__subtitle {
    color: #de543f;
    font-size: 24px;
  }

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
      width: 48%;
    }

    &-right {
      width: 48%;
      .channel {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
