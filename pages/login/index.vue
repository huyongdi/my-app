<template>
	<view class="login-content">
		<view class="top-name">
			<image class="top-img" src="@/static/img/maoyi.svg"></image>
			<text class="top-text">毛气</text>
		</view>
		<view class="uni-form-item uni-column">
			<image class="input-img" src="@/static/img/username.svg"></image>
			<input v-model="username" class="uni-input" focus placeholder="请输入会员号" />
		</view>
		<view class="uni-form-item uni-column">
			<image class="input-img" src="@/static/img/password.svg"></image>
			<input v-model="password" class="uni-input" password placeholder="请输入密码" />
		</view>
		<button class="login-btn" type="primary" @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad: function() {},
		methods: {
			login() {
				if (!this.username || !this.password) {
					uni.showToast({
						title: '??? 毛化了吧',
						icon: 'none',
					})
				} else {
					uni.showLoading({
						title: '登录中...'
					})
					uniCloud.callFunction({
						name: 'login',
						data: {
							username: this.username,
							password: this.password
						}
					}).then((res) => {
						uni.hideLoading()
						const {
							result
						} = res
						if (result.status === 200) {
							console.log('登录成功')
							uni.switchTab({
							    url: '/pages/weather/index'
							});
						} else {
							uni.showModal({
								content: `登录失败，${result.msg}`,
								showCancel: false
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.login-content {
		height: calc(100% - 44px - env(safe-area-inset-top));
		padding: 40rpx;

		.top-name {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50px;
			margin-bottom: 30rpx;

			.top-img {
				width: 115rpx;
				height: 115rpx;
			}

			.top-text {
				font-weight: bold;
				font-size: 40rpx;
				margin-left: 10rpx;
			}
		}

		.uni-column {
			background-color: rgba(242, 243, 245);
			height: 100rpx;
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.input-img {
				height: 80rpx;
				width: 80rpx;
				margin: 0 40rpx 0 20rpx;
			}

			.uni-input {
				height: 100rpx;
				// padding-left: 150rpx;
			}
		}

		.login-btn {
			margin-top: 100rpx;
		}
	}
</style>
