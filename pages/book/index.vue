<template>
	<view class="mybook-wrap">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="top">
			<image class="top-back" :src="leftImg" @click="typeChange"></image>
			<input @confirm="beginSearch" @focus="topInputFocus" v-model="searchVal" class="top-input" confirm-type="search"
			 placeholder="搜索书名/作者" />
			<image class="top-img" src="@/static/img/book-more.png"></image>
		</view>

		<searchBook v-show="pageType === 1" :articleArr="articleArr" :userId="userId" />
		<myBookshelf v-show="pageType === 0" :myArr="myArr" :userId="userId" @getUserBook="getUserBook" />
	</view>
</template>

<script>
	import searchBook from './searchBook.vue'
	import myBookshelf from './myBookshelf.vue'
	import bookMenu from '@/static/img/book-menu.png'
	import bookBack from '@/static/img/book-back.png'

	export default {
		components: {
			searchBook,
			myBookshelf
		},
		data() {
			return {
				userId: '',
				searchVal: '',
				pageType: 0, // 0代表默认状态，显示的是书架，1代表搜索状态
				myArr: [], // 我的书架
				articleArr: [] // 搜索得到的书架
			}
		},
		onLoad: function() {
			this.getUser()
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false)
			// #endif
		},
		computed: {
			leftImg() {
				if (this.pageType === 0) {
					return bookMenu
				} else {
					return bookBack
				}
			}
		},
		watch: {

		},
		onPullDownRefresh: function() {
			this.getUserBook()
		},
		methods: {
			// 获取用户信息
			getUser() {
				const $this = this
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						$this.userId = res.data._id
						$this.getUserBook(res.data._id)
					}
				});
			},
			// 获取用户的书架
			getUserBook(id = this.userId) {
				uni.showLoading({
					title: '加载中...'
				})
				uniCloud.callFunction({
					name: 'book-get',
					data: {
						userId: id
					}
				}).then((res) => {
					uni.stopPullDownRefresh()
					if (res.result === '数据为空！') {
						this.myArr = []
						uni.hideLoading()
					} else {
						this.getChapterList(res.result)
					}
				})
			},
			// 通过书架存储的数据获取内容：章节列表
			getChapterList(list) {
				let bookArr = []
				list.forEach(item => {
					uni.request({
						url: `http://www.biquku.la/${item.bookPath}`,
						success: (res) => {
							uni.hideLoading()
							// 获取章节列表
							const listArr = res.data.match(/(?<=<dd>)(.|\n)*?(?=(<\/dd>))/g)
							const chapterList = listArr.map(item => {
								return {
									name: item.match(/(?<=>).+?(?=<)/)[0],
									path: item.match(/(?<=\").+?(?=\")/)[0]
								}
							})
							// 获得小说封面
							const coverStr = res.data.match(/(?<=fmimg\").+?(?=<span)/)[0]
							const coverImg = coverStr.match(/(?<=src=\").+?(?=\")/)[0]
							this.myArr = list.map(val => {
								if (val.bookPath === item.bookPath) {
									val.chapterList = chapterList
									val.coverImg = 'http://www.biquku.la/' + coverImg
									val.newChapter = chapterList[chapterList.length - 1].name
									val.read = chapterList[0]
								}
								return val
							})
						}
					})
				})
			},
			// 输入框获取焦点时，切换页面type为1
			topInputFocus() {
				this.pageType = 1
			},
			// 点击返回或者菜单时
			typeChange() {
				if (this.pageType === 1) { // 点击的back
					this.pageType = 0
					this.searchVal = ''
					this.articleArr = []
					this.getUserBook()
				}
			},
			// 输入框开始搜索
			beginSearch(e) {
				// http://www.biquku.la/ 笔趣阁资源
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: 'http://www.biquku.la/modules/article/search.php',
					data: {
						searchkey: e.target.value
					},
					success: (res) => {
						uni.hideLoading()
						// 获取table内容
						// ?<=<table : 以<table为开始，但是不包括<table，不包括是用了<
						// (.|\n)*? : *是指任何字符0个或多个，.*?表示匹配任意字符到下一个符合条件的字符 但是由于.不包括换行和行结束符，所以加上了换行
						// ?=(<\/table>) 匹配其后紧接</table>的字符串，其本身不包括</table> 所以不用 <
						const tableStr = res.data.match(/(?<=<table)(.|\n)*?(?=(<\/table>))/g)[0]
						// 获取td里面的内容
						const tdWrap = tableStr.match(/(?<=(<td>|<td class="nowrap">))(.|\n)*?(?=(<\/td>))/g)
						// 以4个一组，分为二维数组 4个依次代表：小说名，最新章节，作者，更新时间
						const articleHtmlArr = []
						if (!tdWrap) {
							uni.showToast({
								title: '库源无此书籍！',
								icon: 'none'
							})
							return
						}
						for (let i = 0; i < tdWrap.length; i += 4) {
							articleHtmlArr.push(tdWrap.slice(i, i + 4))
						}
						// 将html的格式转化为需要的信息
						this.articleArr = articleHtmlArr.map(item => {
							return item.map((val, index) => {
								if (index === 0) {
									val = {
										bookPath: val.match(/(?<=\").+?(?=\")/)[0],
										bookName: val.match(/(?<=>).+?(?=<)/)[0]
									}
								} else if (index === 1) {
									val = {
										latestPath: val.match(/(?<=\").+?(?=\")/)[0],
										latestMame: val.match(/(?<=target=\"_blank\">).+?(?=<)/)[0]
									}
								}
								return val
							})

						})
					}
				});
			},
			// 书籍添加成功之后
			afterAdd() {

			}
		}
	}
</script>

<style lang="less" scoped>
	.mybook-wrap {
		padding: 10rpx 20rpx;

		.top {
			display: flex;
			align-items: center;

			.top-input {
				height: 60rpx;
				background-color: #dedede;
				flex: 1;
				margin-right: 20rpx;
				margin-left: 20rpx;
				padding-left: 20rpx;
			}

			.top-back {
				height: 40rpx;
				width: 40rpx;
			}

			.top-img {
				height: 50rpx;
				width: 50rpx;
			}
		}
	}
</style>
