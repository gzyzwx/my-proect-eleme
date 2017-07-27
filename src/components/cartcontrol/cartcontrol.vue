<template>
	<div class="cartControl">
		<div class="cartDecrease" v-show="food.count>0" v-on:click.stop.prevent="decreaseCart($event)" transition="move">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
		<div class="cartCount" v-show="food.count>0">{{food.count}}</div>
		<div class="cartAdd icon-add_circle" v-on:click.stop.prevent="addCart($event)"></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default{
		props: {
			food: {
				type: Object
			}
		},
		created() {
			// console.log(this.food)
		},
		methods: {
			addCart(event) {
				if (!event._constructed) {
					return
				}
				// console.log('ddd')
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
					this.food.count = 1
				} else {
					this.food.count++
				}
				this.$dispatch('cart.add', event.target)
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return
				}
				if (this.food.count) {
					this.food.count --
				}
			}
		}
	}
</script>
<style type="text/css" lang="less">
	.cartControl{
		font-size: 0px;
		.cartDecrease{
			display: inline-block;
			padding: 6px;
			transition: all 0.4s linear;
			&.move-transition{
				opacity: 1;
				transform: translate3d(0,0,0);
				.inner{
					display: inline-block;
					font-size: 24px;
					line-height: 24px;
					color: rgb(0,160,220);
					transition: all 0.4s linear;
	        transform: rotate(0);
				}
			}
			&.move-enter,&.move-leave{
				opacity: 0;
				transform: translate3d(24px,0,0);
				.inner{
					transform: rotate(180deg);
				}
			}
		}
		.cartCount{
			display: inline-block;
			width: 12px;
			vertical-align: top;
			padding-top: 6px;
			font-size: 12px;
			line-height: 24px;
			color: rgb(147,153,159);
			text-align: center;
		}
		.cartAdd{
			display: inline-block;
			font-size: 24px;
			line-height: 24px;
			color: rgb(0,160,220);
			padding: 6px;
		}
	}
</style>