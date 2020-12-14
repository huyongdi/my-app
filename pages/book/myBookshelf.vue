<template>
	<view class="my-wrap">
		<view class="my-list">
			<view class="one" v-for="item in myArr" :key="item._id" @click="deleteBookshelf(item)">
				<image @error="imageError(item)" class="one-left" :src="item.coverImg"></image>
				<view class="one-right">
					<text class="book-name">{{item.bookName}}</text>
					<view class="book-view">
						<image class="right-img" src="@/static/img/book-1.png" mode=""></image>
						{{item.author}}
					</view>
					<view class="book-view">
						<image class="right-img" src="@/static/img/book-2.png" mode=""></image>
						{{item.read || '--'}}
					</view>
					<view class="book-view">
						<image class="right-img" src="@/static/img/book-3.png" mode=""></image>
						{{item.newChapter|| '--'}}
					</view>
				</view>
			</view>
		</view>

		<view class="no-data" v-show="myArr.length === 0">
			请在顶部搜索添加书籍
		</view>

	</view>

</template>
<script>
	export default {
		props: ['myArr', "userId"],
		components: {

		},
		data() {
			return {

			}
		},
		mounted: function() {
			setTimeout(() => {
				console.log(this.myArr)
			}, 3000)
		},
		methods: {
			// 从书架中移除
			deleteBookshelf(item) {
				const $this = this
				uni.showModal({
					content: '确定从书架中移除吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '移除中...'
							})
							console.log($this.userId)
							uniCloud.callFunction({
								name: 'book-delete',
								data: {
									userId: $this.userId,
									bookId: item._id
								}
							}).then((res) => {
								console.log(res)
								uni.hideLoading()
								uni.showToast({
									title: res.result
								})
								$this.$emit('getUserBook')
							})
						}
					}
				});
			},
			// 图片加载失败时候
			imageError(item) {
				console.log(item)
				this.myArr.forEach(val => {
					if (val._id === item._id) {
						item.coverImg = 'http://www.biquku.la/modules/article/images/nocover.jpg'
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.my-wrap {
		.my-list {
			margin-top: 10px;

			.one {
				padding: 5rpx;
				height: 200rpx;
				margin-bottom: 10rpx;
				border-bottom: 1px solid #d3d3d3;
				display: flex;

				.one-left {
					height: 190rpx;
					width: 160rpx;
				}

				.one-right {
					margin-left: 20rpx;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					padding-bottom: 10rpx;

					.book-name {
						font-weight: bold;
						font-size: 35rpx;
					}

					.right-img {
						height: 40rpx;
						width: 40rpx;
						margin-right: 10rpx;
					}

					.book-view {
						display: flex;
						align-items: center;
					}
				}
			}
		}

		.no-data {
			display: flex;
			justify-content: center;
			margin-top: 100rpx;
		}
	}
</style>
