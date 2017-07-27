<template>
	<div class="shopcart">
		<div class="content" v-on:click="toggleList">
			<div class="contentLeft">
				<div class="logoWrapper">
					<div class="logo" :class="{'highLight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="description">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="contentRight">
				<div class="pay" :class="{'higtLight':payDesc==='去结算'}" @click.stop.prevent="pay">
					{{payDesc}}
				</div>
			</div>
			<div class="ball-container">
				<div v-for="ball in balls" v-show="ball.show" transition="drop" class="ball">
					<div class="inner inner-hook"></div>
				</div>
			</div>
		</div>
		<div class="shopcart-list" v-show="listShow" transition="fold">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" v-on:click="empty">清空</span>
				</div>
				<div class="list-content" v-el:list-content>
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price"><span>￥{{food.price*food.count}}</span></div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
	</div>
	<div class="list-mask" @click="hideList" v-show="listShow" transition="fade"></div>
</template>
<script type="text/javascript">
import Cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'

	export default{
		props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
            {
	            show: false
	          },
	          {
	            show: false
	          },
	          {
	            show: false
	          },
	          {
	            show: false
	          }
	        ],
	        dropBalls: [],
	        fold: true
	      }
	    },
		computed: {
			totalPrice() {
				let total = 0
				this.selectFoods.forEach(function(food, index) {
					// statements
					total += food.price * food.count
				})
				return total
			},
			totalCount() {
				let count = 0
				this.selectFoods.forEach(function(food, index) {
					// statements
					count += food.count
				})
				return count
			},
			payDesc() {
				if (this.totalPrice === 0) {
					console.log(this.minPrice)
					return `￥${this.minPrice}元起送`
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}元起送`
				} else {
					return '去结算'
				}
			},
			listShow() {
				if (!this.totalCount) {
					this.fold = true
					return false
				}
				let show = !this.fold
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$els.listContent, {
								click: true
							})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return show
			}
		},
		methods: {
			drop(el) {
				// console.log(el)
				for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            // this.$nextTick(function () {
            //   console.log(this.dropBalls)
            //   console.log('dd')
            // })
            return
          }
        }
        // console.log(this.dropBalls)
			},
			toggleList() {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0
				})
			},
			hideList() {
				this.fold = true
			},
			pay() {
				if (this.totalPrice < this.minPrice) {
					return false
				} else {
					window.alert('去结算')
				}
			}
		},
		transitions: {
			drop: {
				beforeEnter(el) {
					let count = this.balls.length
					while (count--) {
						let ball = this.balls[count]
						if (ball.show) {
							let rect = ball.el.getBoundingClientRect()
							let x = rect.left - 32
							let y = -(window.innerHeight - rect.top - 22)
							el.style.display = ''
							el.style.webkitTransform = `translate3d(0,${y}px,0)`
							el.style.transform = `translate3d(0,${y}px,0)`
							let inner = el.getElementsByClassName('inner-hook')[0]
							inner.style.webkitTransform = `translate3d(${x}px,0,0)`
							inner.style.transform = `translate3d(${x}px,0,0)`
						}
					}
				},
				enter(el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)'
            el.style.transform = 'translate3d(0,0,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(0,0,0)'
            inner.style.transform = 'translate3d(0,0,0)'
          })
        },
        afterEnter(el) {
          // console.log(this.dropBalls)
          let ball = this.dropBalls.shift()
          // console.log(this.balls)
          // console.log(this.dropBalls)
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
          // console.log(this.balls)
          // console.log(this.dropBalls)
        }
			}
		},
		components: {
			Cartcontrol
		}
	}
</script>
<style type="text/css" lang="less">
	@import "../../common/stylus/mixin.less";
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		// background: #000;
		.content{
			display: flex;
			background: #141d27;
			font-size: 0px;
			.contentLeft{
				flex: 1;
				.logoWrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					// line-height: 44px;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background: #121d27;
					.logo{
						width: 100%;
						height: 100%;
						text-align: center;
						border-radius: 50%;
						background: #2b343c;
						font-size: 16px;
						&.highLight{
							background: rgb(0,160,220)
						}
						.icon-shopping_cart{
							line-height: 44px;
							font-size: 24px;
							color:#80858a;
							&.highLight{
								color: #fff;
							}
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background: rgb(240,20,20);
						box-shadow: 0px 4px 8px 0 rgba(0,0,0,0.4);
					}
				}
				.price{
					display: inline-block;
					font-size: 16px;
					// vertical-align: top;
					line-height: 24px;
					margin-top: 12px;
					box-sizing: border-box;
					padding-right: 12px;
					border-right: 1px solid rgba(255,255,255,0.1);
					font-weight: 700;
					color: rgba(255,255,255,0.4);
					&.highLight{
						color: #fff;
					}
				}
				.description{
					display: inline-block;
					line-height: 24px;
					margin: 12px 0 0 12px;
					color: rgba(255,255,255,0.4);
					font-size: 12px;
				}
			}
			.contentRight{
				flex:0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					color: rgba(255,255,255,0.4);
					font-weight: 700;
					background: #2b333b;
					&.higtLight{
						background: #00b43c;
						color: #fff;
					}
				}
			}
			.ball-container{
				.ball{
					position: fixed;
					left: 32px;
					bottom: 22px;
					z-index: 200;
					&.drop-transition{
						transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
						.inner{
							width: 16px;
							height: 16px;
							border-radius: 50%;
							background: rgb(0,160,220);
							transition: all 0.4s linear;
						}
					}
				}
			}
		}
		.shopcart-list{
				position:absolute;
				left: 0;
				top: 0;
				z-index:-1;
				width: 100%;
				&.fold-transition{
					transition: all 0.5s;
					transform: translate3d(0,-100%,0)
				}
				&.fold-enter,&.fold-leave{
					transform: translate3d(0,0,0)
				}
				.list-header{
					height: 40px;
					line-height: 40px;
					font-size: 20px;
					padding: 0 18px;
					background: #f3f5f7;
					border-bottom: 1px solid rgba(7,17,27,0.1);
					.title{
						float: left;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.empty{
						float: right;
						font-size: 12px;
						color: rgb(0,160,220);
					}
				}
				.list-content{
					padding: 0 18px;
					max-height: 217px;
					background: #fff;
					overflow: hidden;
					.food{
						position: relative;
						padding: 12px 0;
						box-sizing: border-box;
						.borderbottomOne(rgba(7,17,27,0.1));
						.name{
							line-height: 24px;
							font-size: 24px;
							color: rgb(7,17,27);
						}
						.price{
							position: absolute;
							right: 90px;
							bottom: 12px;
							line-height: 24px;
							font-size: 14px;
							color: rgb(240,20,20);
							font-weight: 700;
						}
						.cartcontrol-wrapper{
							position: absolute;
							right: 0px;
							bottom: 6px;
						}
					}
				}
			}
	}
	.list-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		backrop-filter: blur(10px);
		transition: all 0.5s;
		&.fade-transition{
			
			opacity: 1;
			background: rgba(7,17,27,0.6)
		}
		&.fade-enter,&.fade-leave{
			opacity: 0;
			background: rgba(7,17,27,0)
		}
	}
</style>