<template>
  <div id="home">
    <Navbar class="home-nav">
      <div slot="center">蘑菇街</div>
    </Navbar>
    <TabControl :titles="titles" @changTab="changTab" ref="tabControlTop" v-show="isFixed" class="tabCon" />
    <Scroll class="scroll" ref="scroll" @scroll="positionScroll" @pullingUp="pullingUp" :probe-type="3"
      :pullUpLoad="true">
      <HomeSwiper :banners="banners" v-if="flag" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommonds="recommonds" v-if="flag" />
      <TabControl :titles="titles" @changTab="changTab" ref="tabControl" />
      <List :goods="showGoods">
        <ListItem />
      </List>
    </Scroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './common/HomeSwiper'
import HomeRecommend from './common/HomeRecommend'

import Navbar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import List from 'components/content/goods/List'
import ListItem from 'components/content/goods/ListItem'
import BackTop from 'components/content/backtop/BackTop'

import { debounce } from '@/common/utils'

import { getHomeMultidata, getGoodsData } from 'network/api.js'
// getGoodsData
export default {
  name: 'home',
  components: {
    HomeSwiper,
    HomeRecommend,
    Navbar,
    TabControl,
    List,
    ListItem,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      flag: false,
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        pop: {
          list: [],
          page: 0
        },
        new: {
          list: [],
          page: 0
        },
        sell: {
          list: [],
          page: 0
        }
      },
      currentCategory: 'pop',
      isShowBackTop: false,
      saveY: 0,
      tabOffsetTop: 0,
      isFixed: false,
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentCategory].list
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {
    // banner图片加载完成
    swiperImageLoad () {
      // TabControl距离顶部的距离 tabOffsetTop赋值
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    // 上拉加载更多
    pullingUp () {
      this.getGoodsData(this.currentCategory)
      this.$refs.scroll.scroll.refresh()
    },
    // scroll滚动事件
    positionScroll (pos) {
      this.showBackTop(pos)
    },
    // 返回顶部
    backTop () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    showBackTop (pos) {
      // tabControl 吸顶
      this.isFixed = (-pos.y) > this.tabOffsetTop - 44
      // 返回顶部显示隐藏
      this.isShowBackTop = -pos.y > 1000;
    },
    // 请求banner数据
    async getHomeMultidata () {
      const res = await getHomeMultidata()
      this.banners = res.data.banner.list
      this.recommonds = res.data.recommend.list
      this.flag = true
    },
    // 首页列表数据
    async getGoodsData (type) {
      const page = this.goods[type].page + 1
      const res = await getGoodsData(type, page)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
      this.$refs.scroll.finishPullUp();
    },
    // 点击切换分类
    changTab (index) {
      switch (index) {
        case 0:
          this.currentCategory = 'pop'
          break;
        case 1:
          this.currentCategory = 'new'
          break;
        case 2:
          this.currentCategory = 'sell'
          break;
      }
      this.$refs.tabControlTop.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },

  },
  // 页面初始化
  created () {
    this.getHomeMultidata()
    this.getGoodsData('pop')
    this.getGoodsData('new')
    this.getGoodsData('sell')
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 200, false)
    this.$bus.$on('imageLoad', () => {
      refresh()
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-text);
  background-color: #eee;
}
.scroll {
  height: calc(100vh - 93px);
  overflow: hidden;
}

.tabCon {
  position: fixed;
  top: 44px;
  z-index: 9999;
  left: 0;
  right: 0;
}
</style>
