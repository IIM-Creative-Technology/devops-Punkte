import Vue from 'vue';
import Router from 'vue-router';
import Home from './layouts/Home.vue';
import Portail from './views/Portail.vue';
import CategoriesAverages from './views/CategoriesAverages.vue';
import Youtubers from './views/Youtubers.vue';
import ViewsCounts from './views/ViewsCounts.vue';
import VideosDurations from './views/VideosDurations.vue';
import BestPublicationTimes from './views/BestPublicationTimes.vue';
import LikesDislikes from './views/LikesDislikes.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'portail',
      component: Portail,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/categories-averages',
          name: 'categoriesAverages',
          component: CategoriesAverages,
        },
        {
          path: '/youtubers',
          name: 'youtubers',
          component: Youtubers,
        },
        {
          path: '/views-counts',
          name: 'viewsCounts',
          component: ViewsCounts,
        },
        {
          path: '/videos-durations',
          name: 'videosDurations',
          component: VideosDurations,
        },
        {
          path: '/best-publication-times',
          name: 'bestPublicationTimes',
          component: BestPublicationTimes,
        },
        {
          path: '/likes-dislikes',
          name: 'likesDislikes',
          component: LikesDislikes,
        },
      ]
    },
  ],
});
