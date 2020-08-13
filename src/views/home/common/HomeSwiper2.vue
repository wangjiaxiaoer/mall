<template>
  <div>
    <MySwiper>
      <SwiperItem v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" />
        </a>
      </SwiperItem>
    </MySwiper>
  </div>
</template>

<script>
import { MySwiper, SwiperItem } from 'components/common/swiper/index'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    MySwiper,
    SwiperItem
  }
}
</script>

<style>
</style>
