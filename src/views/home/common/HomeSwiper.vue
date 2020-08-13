<template>
  <Swiper>
    <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
    </div>
  </Swiper>
</template>
<script>
import Swiper from 'components/common/swiper/Swiper'
export default {
  name: '',
  data () {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
  },
  methods: {
    imageLoad () {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
};
</script>
<style scoped>
</style>
