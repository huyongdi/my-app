<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	
	.status_bar {
	    height: var(--status-bar-height);  
	    width: 100%;  
	    background-color: #F8F8F8;  
	}  
</style>
