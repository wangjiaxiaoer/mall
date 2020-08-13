<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import { Swiper } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' //注意这里  

export default {
  name: 'MySwiper',
  mounted () {
    new Swiper('.swiper-container', {
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      //如果需要自动切换海报
      autoplay: {
        delay: 3000,//时间 毫秒
        disableOnInteraction: false,//用户操作之后是否停止自动轮播,默认true 
      },
    })
  }
};
</script>
<style scoped>
</style>
