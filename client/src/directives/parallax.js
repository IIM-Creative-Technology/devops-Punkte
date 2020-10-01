import Vue from 'vue';
import _ from 'lodash';

const parallaxFunc = (element, binding) => _.throttle((e) => {
  const el = element;
  const x = ((e.pageX - window.innerWidth / 2) * binding.value) / 8;
  const y = ((e.pageY - window.innerHeight / 2) * binding.value) / 8;
  el.style.transition = '260ms ease';
  el.style.transform = `translate(${x}px, ${y}px)`;
}, 100);

Vue.directive('parallax', {
  // bind(el, binding) {
  //   window.addEventListener('mousemove', parallaxFunc(el, binding));
  // },
  // unbind(el, binding) {
  //   window.removeEventListener('mousemove', parallaxFunc(el, binding));
  // },
});
