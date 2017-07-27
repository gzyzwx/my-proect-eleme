<template>
	<div class="goods">
		<div class="menuWrapper" v-el:menu-wrapper>
			<ul>
				<li v-for="item in goods" class="menuItem" :class="{'current':currentIndex === $index}" v-on:click="selectMenu($index,$event)">
				<span class="text border-1px">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
					{{item.name}}
				</span>
				</li>
			</ul>
		</div>
		<div class="foodsWrapper" v-el:food-wrapper>
			<ul>
				<li v-for="item in goods" class="foodList food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="foodItem border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="description">{{food.description}}</p>
								<div class="extra">
									<span class="num">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="newPrice">￥{{food.price}}</span><span v-show="food.oldPrice" class="oldPrice">{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrolWrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
		<!-- <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart> -->
	</div>
	<food v-ref:food :food="selectedFood"></food>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import Shopcart from '../shopcart/shopcart.vue'
import Cartcontrol from '../cartcontrol/cartcontrol.vue'
import Food from '../food/food.vue'

const ERROR = 0
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			var self = this
			this.$http.get('/api/goods').then(
					(res) => {
						console.log(this)
						res = res.body
						if (res.errno === ERROR) {
							self.goods = res.data
							self.$nextTick(() => {
								self._initScroll()
								self._calculateHeight()
							})
							// console.log(this.goods)
						}
					},
					(err) => {
						console.log(err)
					}
				)
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          // debugger
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
            // console.log(i)
          }
        }
        return 0
			},
			selectFoods() {
				let foods = []
				this.goods.forEach(function(good) {
					// statements
					good.foods.forEach(function(food) {
						// statements
						if (food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		methods: {
			selectFood(food, event) {
				if (!event._constructed) {
					return
				}
				this.selectedFood = food
				this.$refs.food.show()
			},
			selectMenu(index, event) {
				if (!event._constructed) {
					return
				}
				let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
			},
			_initScroll() {
				// console.log(this.$els)
				// console.log(this.$refs)
				this.meunScroll = new BScroll(this.$els.menuWrapper, {
					click: true
				})
				// console.log('ddd')
				this.foodScroll = new BScroll(this.$els.foodWrapper, {
					probeType: 3,
					click: true
				})
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight() {
				let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
				let height = 0
				this.listHeight.push(height)
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
				console.log(this.listHeight)
			},
			_drop(target) {
				// 体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target)
				})
			}
		},
		events: {
			'cart.add'(target) {
				this._drop(target)
			}
		},
		components: {
			Shopcart,
			Cartcontrol,
			Food
		}
	}
</script>
<style type="text/css" lang="less">
	@import "../../common/stylus/mixin.less";
	@import "../../common/stylus/base.less";

	.goods{
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 46px;
		display: flex;
		overflow: hidden;
		.menuWrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menuItem{
				display: table;
				height: 54px;
				width: 56px;
				line-height: 16px;
				padding: 0 12px;
				&.current{
					position: relative;
					margin-top: -1px;
					z-index: 10;
					background: #fff;
					font-weight: 700;
					.text{
						.borderNone();
					}
				}
				.icon{
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease{
						.bg-image("../../components/goods/decrease_3@2x.png","../../components/goods/decrease_3@3x.png");
					}
					&.discount{
						.bg-image("../../components/goods/discount_3@2x.png","../../components/goods/discount_3@3x.png");
					}
					&.guarantee{
						.bg-image("../../components/goods/guarantee_3@2x.png","../../components/goods/guarantee_3@3x.png");
					}
					&.invoice{
						.bg-image("../../components/goods/invoice_3@2x.png","../../components/goods/invoice_3@3x.png");
					}
					&.special{
						.bg-image("../../components/goods/special_3@2x.png","../../components/goods/special_3@3x.png");
					}
				}
				.text{
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					.borderbottomOne(rgba(7,17,27,0.2));
					font-size: 12px;
				}
				//background: 
			}
		}
		.foodsWrapper{
			flex: 1;
			.foodList{
				.title{
					padding-left: 14px;
					height: 26px;
					line-height: 26px;
					border-left: 2px solid #d9dde1;
					font-size: 12px;
					color: rgb(147,153,159);
					background: #f3f5f7;
				}
				.foodItem{
					display: flex;
					margin: 18px;
					padding-bottom: 18px;
					.borderbottomOne(rgba(7,17,27,0.1));
					&:last-child{
						.borderNone();
						margin-bottom: 0px;
					}
					.icon{
						flex: 0 0 57px;
						margin-right: 10px;
					}
					.content{
						flex: 1;
						.name{
							margin: 2px 0 8px 0;
							height: 14px;
							line-height: 14px;
							color: rgb(7,17,27);
							font-size: 14px;
						}
						.description{
							margin-bottom: 8px;
							line-height: 10px;
							color: rgb(147,153,159);
							font-size: 10px;
							line-height: 12px;
						}
						.extra{
							margin-bottom: 8px;
							line-height: 10px;
							color: rgb(147,153,159);
							font-size: 10px;
							.num{
								margin-right: 12px;
							}
						}
						.price{
							font-weight: 700;
							line-height: 24px;
							.newPrice{
								margin-right: 8px;
								font-size: 14px;
								color: rgb(240,20,20);
							}
							.oldPrice{
								text-decoration: line-through;
								font-size: 10px;
								color: rgb(147,153,159);
							}
						}
						.cartcontrolWrapper{
							position: absolute;
							right: 0;
							bottom: 12px;
						}
					}
				}
			}
		}
	}
</style>