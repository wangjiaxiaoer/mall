<template>
  <div class="scroll" ref="scroll">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 滚动到顶部
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 重复加载更多方法
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新bscroll
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.scroll, {
      probeType: this.probeType,
      mouseWheel: true,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }
    // 上拉加载更多,监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  }
}
</script>

<style>
</style>
