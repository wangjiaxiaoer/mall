import Vue from 'vue'
import App from './App.vue'

import VueLazyLoad from 'vue-lazyload'
import _ from 'lodash'

import router from './router/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.prototype._ = _

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png'),
})

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
