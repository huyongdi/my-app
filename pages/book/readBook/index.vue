<template>
	<view class="read-all">
		<view class="top-op" v-show="hideShow">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="top-bar">
				<image @click="backToShelf" class="back-img" src="@/static/img/book-back.png"></image>
			</view>
		</view>
		<view class="bot-op" v-show="hideShow">
			<image @click="showList" class="list-img" src="@/static/img/book-list.png"></image>
		</view>
		<uni-drawer :width="drawWidth" ref="draw">
			<view class="draw-wrap">
				<view class="title">
					{{jumpItem.bookName}}
				</view>
				<view class="draw-scroll">
					<view class="one" v-for="val in jumpItem.chapterList" :key="val.path">
						{{val.name}}
					</view>
				</view>
			</view>
		</uni-drawer>


		<view class="article-wrap" @click="showHide">
			12345
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				hideShow: false, // false的时候阅读状态，true的时候代表点击了内容
				jumpItem: {}, // 跳转带过来的数据

				// 抽屉数据
				drawWidth: 250,
			}
		},
		onLoad(options) {
			this.jumpItem = JSON.parse(decodeURIComponent(options.item))
		},
		methods: {
			// 暂时隐藏的操作内容
			showHide() {
				this.hideShow = !this.hideShow
			},
			// 点击返回
			backToShelf() {
				uni.switchTab({
					url: '/pages/book/index'
				});
			},
			// 点击滑出章节列表
			showList() {
				console.log(this.jumpItem)
				this.$refs.draw.open()
			}
		}
	}
</script>

<style scoped lang="less">
	.read-all {
		.top-op {
			position: fixed;
			top: 0;
			background-color: #fff;
			width: 100%;

			.top-bar {
				display: flex;
				align-items: center;
				height: 70rpx;
				width: 100%;
				padding: 0 20rpx;

				.back-img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.bot-op {
			position: fixed;
			bottom: 0;
			background-color: #fff;
			height: 70rpx;
			width: 100%;
			display: flex;
			align-items: center;

			.list-img {
				padding: 0 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.draw-wrap {
			display: flex;
			flex-direction: column;
			height: calc(~'100% - 40rpx');
			padding: 20rpx;

			.title {
				font-weight: bold;
			}

			.draw-scroll {
				// height: 650rpx;
				height: 100%;
				overflow-y: auto;
				margin-top: 30rpx;
				.one{
					height: 60rpx;
					line-height: 60rpx;
					border-bottom: 1px solid #d3d3d3;
				}
			}
		}

		.article-wrap {
			height: 100%;
			overflow-y: auto;
		}
	}
</style>
