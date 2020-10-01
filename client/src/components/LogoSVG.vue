/* eslint-disable max-len */
<template>
<div
  class="logo-container"
  :style="{margin: `${8 * ratio}px 0`}"
>
  <img
    :src="playButton"
    :height="`${22 * ratio}`"
    :width="`${22 * ratio}`"
    :style="{marginRight: `${8*ratio}px`}"
    class="playButton"
  >
  <svg preserveAspectRatio="xMinYMin meet" :width="`${150 * ratio}px`" :height="`${29 * ratio}px`" :viewBox="`0 0 ${150 * ratio} ${29 * ratio}`" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
    <title>Artboard</title>
    <desc>Created with Sketch.</desc>
    <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="integralcf, Josefin Sans" font-size="24" font-weight="bold" letter-spacing="0.0963541">
      <text id="DataTube." :font-size="`${24  * ratio}px`">
        <tspan x="0" :y="`${23 * ratio}`" fill="#000000">DataTube</tspan>
        <tspan :x="`${140 * ratio}`" :y="`${23 * ratio}`" fill="#EE5355">.</tspan>
      </text>
    </g>
  </svg>
</div>
</template>

<script>
import playButton from '@/assets/play-circle@2x.png';

export default {
  data() {
    return {
      playButton,
    };
  },
  props: {
    ratio: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
}
</style>
