<template>
	<view class="wearther-content">
		<view class="now-top">
			<view class="top-name">
				{{place}}区 <image class="name-img" :src="require(`@/static/img/weatherIcon/${nowObj.icon}.png`)" alt="top天气图">
			</view>
			<view class="top-temp">
				{{nowObj.temp}}
				<text class="temp-unit">℃</text>
			</view>
			<view class="top-range">
				{{nowMinMax}}
				{{nowObj.air}}
			</view>
			<view class="top-other">
				{{nowObj.text}}
				{{nowObj.vis}}公里
				{{nowObj.windDir}}
				{{nowObj.windScale}}级: {{nowObj.windSpeed}}公里/小时
			</view>
		</view>
		<view class="update-time">
			最新观测时间：{{upDateTime}}
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
			<view class="scroll-view-item_H" v-for="item in hourArr" :key="item.fxTime">
				<view>{{item.fxTime}}</view>
				<image class="hour-img" :src="require(`@/static/img/weatherIcon/${item.icon}.png`)" alt="小时图">
					<view>{{item.temp}}℃</view>
			</view>
		</scroll-view>
		<view class="day7-warp" v-for="item in dailyArr" :key="item.fxDate">
			<view class="one-day">
				<view>{{item.fxDate}}</view>
				<image class="day-img" :src="require(`@/static/img/weatherIcon/${item.iconDay}.png`)" alt="天图">
					<view>{{item.tempMin}}℃/{{item.tempMax}}℃</view>
			</view>
		</view>
		<view class="sun">
			<view>日出: {{dailyArr[0] && dailyArr[0].sunrise}}</view>
			<view>日落: {{dailyArr[0] && dailyArr[0].sunset}}</view>
		</view>
	</view>
</template>

<script>
	import {
		weatherKey
	} from '@/config/main.js'
	import {
		getHourMin
	} from '@/utils/getTime'
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				nowObj: { // now接口返回的实时信息
					icon: 100, // 图片
					air: '', // 空气汉字
				},
				dailyArr: [],
				hourArr: [],
				place:{}
			}
		},
		onLoad: function() {
			this.initWeather()
		},
		computed: {
			nowMinMax() {
				if (this.dailyArr[0]) {
					return `${this.dailyArr[0].tempMin}℃/${this.dailyArr[0].tempMax}℃`
				} else {
					return ''
				}
			},
			upDateTime() {
				if (this.nowObj.obsTime) {
					return getHourMin(this.nowObj.obsTime)
				}
			}
		},
		methods: {
			// 根据手机位置初始化天气
			initWeather() {
				const $this = this
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('开始')
						const location = res.longitude + ',' + res.latitude
						$this.getPlace(location)
						$this.getWeatherNow(location)
						$this.getWeather7(location)
						$this.getWeatherAir(location)
					}
				});
			},
			// 获取地区 
			getPlace(location) {
				uni.request({
					url: 'https://geoapi.qweather.com/v2/city/lookup',
					data: {
						location,
						key: weatherKey
					},
					success: (res) => {
						console.log(res.data);
						this.place = res.data.location[0].name
					}
				});
			},
			// 获取实况天气
			getWeatherNow(location) {
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/now',
					data: {
						location,
						key: weatherKey
					},
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res.data.now)
							this.nowObj = { ...this.nowObj,
								...res.data.now
							}
						}
					}
				});
			},
			// 获取7天天气
			getWeather7(location) {
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/7d',
					data: {
						location,
						key: weatherKey
					},
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res.data.daily)
							this.dailyArr = res.data.daily
						}
					}
				});
			},
			// 获取空气质量
			getWeatherAir(location) {
				uni.request({
					url: 'https://devapi.qweather.com/v7/air/now',
					data: {
						location,
						key: weatherKey
					},
					success: (res) => {
						if (res.statusCode === 200) {
							this.nowObj.air = `空气${res.data.now.category}:${res.data.now.pm2p5}`
						}
					}
				});
			},
			// 获取未来24小时
			getWeatherAir(location) {
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/24h',
					data: {
						location,
						key: weatherKey
					},
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res.data.hourly)
							this.hourArr = res.data.hourly.map(item => {
								item.fxTime = getHourMin(item.fxTime)
								return item
							})
						}
					}
				});
			},
			// 24h滚动
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>

<style scoped lang="less">
	.wearther-content {
		background-image: url(@/static/img/weatherBc/test.jpg);
		background-size: 100%;
		padding: 0 20rpx;
		color: #fff;

		.now-top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-top: 60rpx;

			.top-name {
				font-size: 40rpx;

				.name-img {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: -25rpx;
					margin-left: 10rpx;
				}
			}

			.top-temp {
				font-size: 80rpx;
				margin-right: 80rpx;

				.temp-unit {
					font-size: 40rpx;
					float: right;
					margin-top: 15rpx;
				}
			}

			.top-range {
				color: #eee;
			}
		}

		.update-time {
			color: #3300FF;
			margin-top: 60rpx;
			border-bottom: 1px solid #ddd;
			padding-bottom: 10rpx;
			text-align: right;
		}

		.scroll-view_H {
			white-space: nowrap;
			padding: 20rpx 0;

			.scroll-view-item_H {
				display: inline-block;
				width: 20%;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				font-size: 36rpx;

				.hour-img {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}

		.day7-warp {
			.one-day {
				display: flex;
				justify-content: space-between;
				border-top: 1px solid #ddd;
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 20rpx;

				.day-img {
					width: 80rpx;
					height: 80rpx;
					margin-top: 10rpx;
				}
			}
		}

		.sun {
			padding: 40rpx 0;
			border-top: 1px solid #ddd;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
