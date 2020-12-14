<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// const $this = this
			// uni.getStorage({
			//     key: 'loginStatus',
			//     success: function (res) {
			//         console.log(res.data);
			// 		if (res.data === '1') {
			// 			$this.jumpToPage()
			// 		}
			//     }
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	// @import url("https://at.alicdn.com/t/font_2232593_xafgi2239m8.css");

	// .iconfont {
		/* font-size: 100rpx; */
	// }

	uni-page-body {
		height: 100%;

		>uni-view {
			height: 100%;
			overflow: auto;
		}
	}
</style>
