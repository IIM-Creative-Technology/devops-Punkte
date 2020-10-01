import Vue from 'vue';
import VueParticles from 'vue-particles';
import App from './App.vue';
import router from './router';
import store from './store';
import './directives/parallax';

Vue.use(VueParticles);

Vue.config.productionTip = false;

Vue.filter('numberWithSpace', (value) => {
  if (value) {
    const newValue = value.toString();
    return newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
