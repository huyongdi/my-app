<template>
	<view class="wearther-content">
		天气
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad: function() {
			initWeather()
		},
		
		methods: {
			// 根据手机位置初始化天气
			initWeather(){
				console.log(222)
			},
			// 请求百度接口获取天气
			getWeather(){
				uni.request({
					url: 'http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=pSI4uAcN7VMFdc1jCSQDwxS3KxGghGgz',
					data: {
						text: 'uni.request'
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">

</style>
