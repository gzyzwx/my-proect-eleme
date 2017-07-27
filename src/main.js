import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Routers from './router'
import 'common/stylus/index.less'

Vue.use(VueRouter)
Vue.use(VueResource)
// let app = Vue.extend(App)

let router = new VueRouter({
  linkActiveClass: 'active'
})

Routers(router)
// router.map({
//   '/': {
//     component: goods
//   },
//   '/goods': {
//     component: goods
//   },
//   '/ratings': {
//     component: ratings
//   },
//   'seller': {
//     component: seller
//   }
// });

router.start(App, '#app')
// router.start(App,'#app')
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
// router.go('/goods')
