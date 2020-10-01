<template>
  <div class="section_title">
    <h1>
      {{ title }}
      <span class="red">.</span>
    </h1>
    <p>{{ edito }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title',
      required: true,
    },
    edito: {
      type: String,
      default: 'edito',
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.section_title {
  margin: 1em 0;

  h1 {
    margin-bottom: 1em;
    font-family: "integralcf", sans-serif;
    font-size: 26px;
  }

  p {
    font-size: 17px;
    line-height: 22px;
    color: #9a9a9a;
    margin: 0;
  }
}

.red {
  color: #de543f;
}
</style>
