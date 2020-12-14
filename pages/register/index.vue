<template>
	<view class="register-wrap">
		<view class="uni-form-item">
			<view class="title">
				<text class="red-notice">*</text>用户名：</view>
			<input v-model="username" class="uni-input" placeholder="请输入用户名" />
		</view>
		<view class="uni-form-item">
			<view class="title"><text class="red-notice">*</text>密码：</view>
			<input v-model="password" password class="uni-input" placeholder="请输入密码" />
		</view>
		<view class="uni-form-item">
			<view class="title"><text class="red-notice">*</text>确认密码：</view>
			<input v-model="password2" password class="uni-input" placeholder="请确认密码" />
		</view>
		<button class="register-btn" type="primary" @click="register">提交</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				username: '',
				password: '',
				password2: ''
			}
		},
		methods: {
			register() {
				if (!this.password || !this.password2 || !this.username) {
					uni.showModal({
						content: "不填完就提交，毛化了?",
						showCancel: false
					})
					return
				}
				if (this.password !== this.password2) {
					uni.showModal({
						content: "两次输入的密码不一致，毛化了?",
						showCancel: false
					})
					return
				}
				uni.showLoading({
					title: '提交中...'
				})
				uniCloud.callFunction({
					name: 'register',
					data: {
						username: this.username,
						password: this.password
					}
				}).then((res) => {
					console.log(res)
					uni.hideLoading()
					if (res.result.status === 500) {
						uni.showModal({
							content: res.result.msg,
							showCancel: false
						})
					} else {
						uni.showModal({
							content: '提交成功',
							showCancel: false
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/index'
							});
						}, 2000)
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `添加数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			}
		}
	}
</script>

<style lang="less">
	.register-wrap {
		padding: 30rpx;

		.uni-form-item {
			margin-bottom: 30rpx;
			.red-notice{
				color: red;
				margin-right: 10rpx;
			}
			.uni-input {
				margin-top: 20rpx;
				background-color: rgba(242, 243, 245);
				height: 100rpx;
				border-radius: 100rpx;
				padding-left: 30rpx;
			}
		}

		.register-btn {
			margin-top: 100rpx;
		}
	}
</style>
