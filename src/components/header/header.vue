<template>
	<div class="header">
		<div class="contentWrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="contentHeader">
				<div class="contentTitle">
					<span class="contentTitleBrand"></span>
					<span class="contentTitleName">{{seller.name}}</span>
				</div>
				<div class="contentDescription">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="contentSupport">
					<span class="supportIcon" v-bind:class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div><!-- end of contentHeader -->
			<div v-if="seller.supports" class="supportCount" v-on:click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletinWrapper">
			<span class="bulletinTitle"></span><span class="bulletinText">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<div class="detail" v-show="detailShow" transition="fadeOne">
			<div class="detailWrapper clearFix">
				<div class="detailMain">
					<p class="name">{{seller.name}}</p>
					<div class="starWrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li v-for="item in seller.supports" class="support-item">
							<span class="icon" :class="classMap[seller.supports[$index].type]"></span>
							<!-- <span class="icon" :class="classMap[item.type]"></span> -->
							<span class="text">{{seller.supports[$index].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
					<!-- <p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p>
					<p>{{seller.bulletin}}</p> -->
				</div>
			</div>

			<div class="detailClose">
				<i class="icon-close" v-on:click="detailClose"></i>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import star from '../star/star.vue'

	export default{
		data() {
			return {
				// seller: {}
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
				detailShow: false
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		created() {
			// this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		methods: {
			showDetail() {
				this.detailShow = true
			},
			detailClose() {
				this.detailShow = false
			}
		},
		components: {
			star
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	@import "../../common/stylus/mixin";

	.header{
		position: relative;
		color:#fff;
		background: rgba(7,17,27,0.5);
		overflow: hidden;
		.contentWrapper{
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0px;
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}
			}
			.contentHeader{
				display: inline-block;
				margin-left: 16px;
				font-size: 14px;
				vertical-align: top;
				.contentTitle{
					margin:2px 0 8px 0;
					height: 18px;
					line-height: 18px;
				}
				.contentTitleBrand{
					display: inline-block;
					vertical-align: top;
					width: 30px;
					height: 18px;
					.bg-image("../../components/header/brand@2x.png","../../components/header/brand@3x.png");
					background-size: 30px 18px;
					background-repeat: no-repeat;
					.contentTitleName{
						margin-left: 6px;
						font-size: 16px;
						line-height: 18px;
						font-weight: bold;
					}
				}
				.contentDescription{
					margin-bottom: 10px;
					line-height: 12px;
					font-size: 12px;
				}
				.contentSupport{
					.supportIcon{
						display: inline-block;
						vertical-align: top;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						&.decrease{
							.bg-image("../../components/header/decrease_1@2x.png","../../components/header/decrease_1@3x.png");
						}
						&.discount{
							.bg-image("../../components/header/discount_1@2x.png","../../components/header/discount_1@3x.png");
						}
						&.guarantee{
							.bg-image("../../components/header/guarantee_1@2x.png","../../components/header/guarantee_1@3x.png");
						}
						&.invoice{
							.bg-image("../../components/header/invoice_1@2x.png","../../components/header/invoice_1@3x.png");
						}
						&.special{
							.bg-image("../../components/header/special_1@2x.png","../../components/header/special_1@3x.png");
						}
					}
					.text{
						line-height: 12px;
						font-size: 10px;
					}
				}
			}
			.supportCount{
				position: absolute;
				right: 12px;
				bottom: 18px;
				padding: 0 8px;
				height: 24px;
				// line-height: 24px;
				display: flex;
				justify-content:center;
				align-items:center;
				border-radius: 14px;
				background-color: rgba(0,0,0,0.2);
				// text-align: center;
				color: #fff;
				.count{
					font-size: 12px;
				}
				.icon-keyboard_arrow_right{
					margin-left: 2px;
					font-size: 14px;
				}
			}
		}
		.bulletinWrapper{
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background: rgba(7,17,27,0.2);
			// font-size: 0px;
			.bulletinTitle{
				display: inline-block;
				vertical-align: top;
				margin-top: 8px;
				height: 12px;
				width: 22px;
				.bg-image("../../components/header/bulletin@2x.png","../../components/header/bulletin@3x.png");
				background-size: 100% 100%;
				// background-position: left center;
				background-repeat: no-repeat;
			}
			.bulletinText{
				vertical-align: top;
				margin: 0 4px;
				line-height: 28px;
				font-size: 12px;

			}
			.icon-keyboard_arrow_right{
				position: absolute;
				top: 50%;
				font-size: 10px;
				right: 12px;
				transform: translateY(-50%);

			}
		}
		.background{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
		}
		.detail{
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			transition: all 0.5s;
			backdrop-filter: blur(10px);
			&.fadeOne-transition{
				opacity: 1;
				background: rgba(7,17,27,0.8);
			}
			&.fadeOne-enter,&.fadeOne-leave{
				opacity: 0;
				background: rgba(7,17,27,0);
			}
			.detailWrapper{
				min-height: 100%;
				width: 100%;
				.detailMain{
					margin-top: 64px;
					padding-bottom: 64px;
					.name{
						line-height: 16px;
						text-align: center;
						font-size: 16px;
						font-weight: 700;
					}
					.starWrapper{
						margin-top: 18px;
						// padding: 2px auto;
						text-align: center;
					}
					.title{
						display: flex;
						width: 80%;
						margin: 28px auto 24px auto;
						.line{
							flex:1;
							position: relative;
							top: -6px;
							border-bottom: 1px solid rgba(255,255,255,0.2)
						}
						.text{
							padding: 0 12px;
							font-size: 14px;
							font-weight: 700;
						}
					}
					.supports{
						width: 80%;
						margin: 0 auto;
						.support-item{
							padding: 0 12px;
							margin-bottom: 12px;
							font-size: 0px;
							&:last-child{
								margin-bottom: 0px;
							}
							.icon{
								display: inline-block;
								width: 16px;
								height: 16px;
								vertical-align: middle;
								margin-right: 6px;
								background-size: 16px 16px;
								background-repeat: no-repeat;

								&.decrease{
									.bg-image("../../components/header/decrease_2@2x.png","../../components/header/decrease_2@3x.png");
								}
								&.discount{
									.bg-image("../../components/header/discount_2@2x.png","../../components/header/discount_2@3x.png");
								}
								&.guarantee{
									.bg-image("../../components/header/guarantee_2@2x.png","../../components/header/guarantee_2@3x.png");
								}
								&.invoice{
									.bg-image("../../components/header/invoice_2@2x.png","../../components/header/invoice_2@3x.png");
								}
								&.special{
									.bg-image("../../components/header/special_2@2x.png","../../components/header/special_2@3x.png");
								}
							}
							.text{
								font-size: 12px;
								vertical-align: middle;
								// line-height: 16px;
							}
						}
					}
					.bulletin{
						width: 80%;
						margin: 0 auto;
						padding: 0 12px;
						line-height: 24px;
						font-size: 12px;
					}
				}
			}
			.detailClose{
				position: relative;
				width: 32px;
				height: 32px;
				margin: -64px auto 0px auto;
				clear: both;
				font-size: 32px;
				// color: #fff;
			}
		}
	}
</style>