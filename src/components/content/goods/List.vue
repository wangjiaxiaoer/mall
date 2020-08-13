<template>
  <div class="goods-list flex">
    <ListItem v-for="(item,index) in goods" :key="index" :goodsItem="item"></ListItem>
  </div>
</template>
<script>
import ListItem from './ListItem'
export default {
  name: '',
  data () {
    return {}
  },
  components: {
    ListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
  }
};
</script>
<style scoped>
.goods-list {
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  /* height: calc(100vh-94px); */
}
</style>
