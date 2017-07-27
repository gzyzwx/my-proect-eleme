import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Seller from './components/seller/seller'

export default function (router) {
  router.map({
    '/': {
      component: Goods
    },
    '/goods': {
      component: Goods
    },
    '/ratings': {
      component: Ratings
    },
    '/seller': {
      component: Seller
    }
  })
}
