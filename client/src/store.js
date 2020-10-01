import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/api';
import cloneDeep from 'lodash/cloneDeep';
import RegionService from '@/services/region.service';
import CategoryService from '@/services/category.service';
import RessourceService from '@/services/ressouce.service';

Vue.use(Vuex);

const models = {
  stats: {
    maxVideoDuration: 0,
    minVideoDuration: 0,
    averageVideoDuration: 0,
    longestVideo: '',
    shortestVideo: '',
    minLikes: 0,
    maxLikes: 0,
    minDislikes: 0,
    maxDislikes: 0,
    id: '',
    youtuber1: {
      title: '',
      subscriberCount: 0,
      likePercentage: 0
    },
    youtuber2: {
      title: '',
      subscriberCount: 0,
      likePercentage: 0
    },
    youtuber3: {
      title: '',
      subscriberCount: 0,
      likePercentage: 0
    }
  },
};

export default new Vuex.Store({
  state: {
    selectedCountries: {},
    selectedRanges: {},
    selectedCategories: {},
    stats1: cloneDeep(models.stats),
    stats2: cloneDeep(models.stats),
    isLoading: true,
    categories: [],
    countries: [],
    column1: {
      selected: {
        country: '',
        range: '',
        category: '',
      },
      subscribersRanges: [
        {
          label: '0 - 10 000',
          nbChannelInRange: '1',
          value: '0-10000',
        },
        {
          label: '10 000 - 100 000',
          nbChannelInRange: '11',
          value: '10000-100000',
        },
        {
          label: '100 000 - 500 000',
          nbChannelInRange: '22',
          value: '100000-500000',
        },
        {
          label: '500 000 - 1 000 000',
          nbChannelInRange: '12',
          value: '500000-1000000',
        },
        {
          label: '1 000 000 - 10 000 000',
          nbChannelInRange: '11',
          value: '1000000-10000000',
        },
      ],
      datas: [],
    },
    column2: {
      selected: {
        country: '',
        range: '',
        category: 2,
      },
      subscribersRanges: [
        {
          label: '0 - 10 000',
          nbChannelInRange: '1',
          value: '0-10000',
        },
        {
          label: '10 000 - 100 000',
          nbChannelInRange: '11',
          value: '10000-100000',
        },
        {
          label: '100 000 - 500 000',
          nbChannelInRange: '22',
          value: '100000-500000',
        },
        {
          label: '500 000 - 1 000 000',
          nbChannelInRange: '12',
          value: '500000-1000000',
        },
        {
          label: '1 000 000 - 10 000 000',
          nbChannelInRange: '11',
          value: '1000000-10000000',
        },
      ],
      datas: [],
    },
    compare: true,
  },
  mutations: {
    setSubscribersRanges(state, { column, datas }) {
      state[`column${column}`].subscribersRanges = datas;
    },
    setData(state, { column, datas }) {
      state[`column${column}`].datas = datas;
    },
    setSearchParams(state, { column, index, value }) {
      state[`column${column}`].selected[index] = value;
    },
    toggleCompare(state) {
      state.compare = !state.compare;
    },
    setCountryList(state, countries) {
      state.countries = [...countries];
    },
    setCategoryList(state, categories) {
      state.categories = [...categories];
    },
    setYoutuber(state, { statsSide, value, index }) {
      state[`stats${  statsSide}`][`youtuber` + (index + 1)] = value
    },
    setVideoId(state, { statsSide, value }) {
      state[`stats${  statsSide}`].id = value
    },
    setMaxVideoDuration(state, { statsSide, value }) {
      state[`stats${  statsSide}`].maxVideoDuration = value;
    },
    setMinVideoDuration(state, { statsSide, value }) {
      state[`stats${  statsSide}`].minVideoDuration = value;
    },
    setAverageVideoDuration(state, { statsSide, value }) {
      state[`stats${  statsSide}`].averageVideoDuration = value;
    },
    setLongestVideo(state, { statsSide, value }) {
      state['stats' + statsSide].longestVideo = value
    },
    setShortestVideo(state, { statsSide, value }) {
      state['stats' + statsSide].shortestVideo = value
    },
    setMinLikes(state, { statsSide, value }) {
      state[`stats${  statsSide}`].minLikes = value;
    },
    setMaxLikes(state, { statsSide, value }) {
      state[`stats${  statsSide}`].maxLikes = value;
    },
    setMinDislikes(state, { statsSide, value }) {
      state[`stats${  statsSide}`].minDislikes = value;
    },
    setMaxDislikes(state, { statsSide, value }) {
      state[`stats${  statsSide}`].maxDislikes = value;
    },
  },
  actions: {
    async setSelect({ commit, state }, payload) {
      commit('setSearchParams', payload);
      let datas = [];
      const {
        selected: { country, category, range },
      } = state[`column${payload.column}`];

      if (country !== '' && category !== '' && range !== '') {
        state.isLoading = true;
        datas = await RessourceService.getRessouces(country, category, range);
        const { subscriberRanges } = datas;
        commit('setSubscribersRanges', {
          column: payload.column,
          datas: subscriberRanges,
        });
        commit('setData', {
          column: payload.column,
          datas,
        });
        state.isLoading = false;
      }
    },
    toggleCompare({ commit }) {
      commit('toggleCompare');
    },
    updateSelectedCategory({ commit }, payload) {
      commit('updateSelectedCategory', payload);
    },
    async setList({ commit }, payload) {
      if (payload === 'categories') {
        commit('setCategoryList', await CategoryService.getAllCategories());
      } else if (payload === 'countries') {
        commit('setCountryList', await RegionService.getAllRegions());
      }
    },
  },
  getters: {
    getColumn1Selection: state => state.column1.selected,
    getColumn2Selection: state => state.column2.selected,
    getSubscribersRanges: state => [
      state.column1.subscribersRanges,
      state.column2.subscribersRanges,
    ],
    getColumn1Datas: state => state.column1.datas,
    getColumn2Datas: state => state.column2.datas,
    getCountries: state => state.countries,
    getCategories: state => state.categories,
    getCompare: state => state.compare,
    getStats: state => statsSide => state['stats' + statsSide],
    getMaxVideoDuration: state => statsSide => state['stats' + statsSide].maxVideoDuration,
    getMinVideoDuration: state => statsSide => state['stats' + statsSide].minVideoDuration,
    getAverageVideoDuration: state => statsSide => state['stats' + statsSide].averageVideoDuration,
    getLongestVideo: state => statsSide => state['stats' + statsSide].longestVideo,
    getShortestVideo: state => statsSide => state['stats' + statsSide].shortestVideo,
    getYoutubers: state => statsSide => [
      state['stats' + statsSide].youtuber1,
      state['stats' + statsSide].youtuber2,
      state['stats' + statsSide].youtuber3
    ],
    getId: state => statsSide => state['stats' + statsSide].id,

    getMaxVideoDurations: state => [state.stats1.maxVideoDuration, state.stats2.maxVideoDuration],
    getMinVideoDurations: state => [state.stats1.minVideoDuration, state.stats2.minVideoDuration],
    getAverageVideoDurations: state => [state.stats1.averageVideoDuration, state.stats2.averageVideoDuration],
    getLongestVideos: state => [state.stats1.longestVideo, state.stats2.longestVideo],
    getShortestVideos: state => [state.stats1.shortestVideo, state.stats2.shortestVideo],
    
    getMinLikes: state => statsSide => state['stats' + statsSide].minLikes,
    getMaxLikes: state => statsSide => state['stats' + statsSide].maxLikes,
    getMinDislikes: state => statsSide => state['stats' + statsSide].minDislikes,
    getMaxDislikes: state => statsSide => state['stats' + statsSide].maxDislikes,
  },
});
