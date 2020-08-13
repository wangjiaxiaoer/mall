<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
}
</script>

<style scoped>
.swiper-slide img {
  width: 100%;
}
</style>
