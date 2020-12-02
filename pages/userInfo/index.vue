<template>
	<view class="wearther-content">
		<view class="top">
			<image class="top-img" src="@/static/img/my-user.png"></image>
			<view class="right-name">
				<view class="nick-name">我是毛衣</view>
				<view class="sig">这里放个性签名</view>
			</view>
		</view>
		
		<view class="op-lists">
			<view class="list" @click="logout">
				<image class="list-img" src="@/static/img/logout.png"></image>
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad: function() {},
		methods: {
			logout() {
				uni.clearStorage()
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.wearther-content {
		background-color: rgba(237, 237, 237);

		.top {
			padding: 60rpx 40rpx;
			display: flex;
			background-color: #fff;
			margin-bottom: 20rpx;
			.top-img {
				width: 120rpx;
				height: 120rpx;
				margin-right: 30rpx;
			}

			.right-name {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.nick-name {
					font-size: 40rpx;
					font-weight: bold;
				}

				.sig {
					color: #999;
				}
			}
		}
		.op-lists{
			background-color: #fff;
			.list{
				border-bottom: 1px solid #d3d3d3;
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				.list-img{
					width: 60rpx;
					height: 60rpx;
					margin-right: 30rpx;
				}
			}
		}
	}
</style>
