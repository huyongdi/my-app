<template>
	<view class="search-wrap">
		<view class="search-list">
			<view class="result-title">
				搜索结果：
			</view>
			<view class="one" v-for="item in articleArr" :key="Math.random()" @click="addBookshelf(item)">
				<text>书名：{{item[0].bookName}}</text>
				<text>最新章节：{{item[1].latestMame}}</text>
				<text>作者：{{item[2]}}</text>
				<text>更新时间：{{item[3]}}</text>
			</view>
			<view v-show="articleArr.length === 0" class="no-result">
				暂无结果
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['articleArr','userId'],
		components: {

		},
		data() {
			return {

			}
		},
		mounted: function() {

		},
		methods: {
			// 点击添加到书架
			addBookshelf(item) {
				const $this = this
				uni.showModal({
					content: '要加入到书架吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '存储中...'
							})
							console.log($this.userId)
							uniCloud.callFunction({
								name: 'book-add',
								data: {
									userId: $this.userId,
									bookName: item[0].bookName,
									author: item[2],
									bookPath: item[0].bookPath,
								}
							}).then((res) => {
								uni.hideLoading()
								const {
									result
								} = res
								if (result.status !== 500) {
									uni.showToast({
										title: '添加成功'
									})
								} else {
									uni.showToast({
										title: result.msg,
										icon: 'none'
									})
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-wrap {
		.search-list {
			.result-title {
				margin: 10px 0
			}

			.one {
				height: 200rpx;
				background-color: #dedede;
				margin-bottom: 20rpx;
				padding: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		.no-result{
			display: flex;
			justify-content: center;
			margin-top: 30rpx;
		}
	}
</style>
