<template>
	<view class="wearther-content">
		<view @click="logout">退出登录</view>
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
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
		}
	}
</script>

<style scoped lang="less">

</style>
