<template>
  <view>
	  <view class="guess-section">
	  	<view v-for="(item, index) in recommendProductList" :key="index" class="guess-item" @click="navToDetailPage(item)">
	  		<view class="image-wrapper">
	  			<image :src="item.pic" mode="aspectFill"></image>
	  		</view>
	  		<text class="title clamp">{{item.name}}</text>
	  		<text class="title2 clamp">{{item.subTitle}}</text>
	  		<text class="price">￥{{item.price}}</text>
	  	</view>
	  </view>
	  <uni-load-more :status="loadingType"></uni-load-more>
  </view>
  
</template>

<script>
	import {
		fetchContent,
		fetchRecommendProductList
	} from '@/api/home.js';
	import {
		formatDate
	} from '@/utils/date';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				titleNViewBackground: '',
				titleNViewBackgroundList: ['rgb(203, 87, 60)', 'rgb(205, 215, 218)'],
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				advertiseList: [],
				advertiseList2: [
					{ pic: '/static/carousel/carousel1.jpg' },
					{ pic: '/static/carousel/carousel2.png' },
					{ pic: '/static/carousel/carousel3.png' },
					{ pic: '/static/carousel/cartier.png' },
					{ pic: '/static/carousel/gold.jpg' },
				],
				brandList: [],
				homeFlashPromotion: [],
				newProductList: [],
				hotProductList: [],
				recommendProductList: [],
				recommendParams: {
					pageNum: 1,
					pageSize: 8
				},
				loadingType:'more'
			};
		},
		onLoad() {
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh(){
			console.log("run");
			this.recommendParams.pageNum=1;
			this.loadData();
		},
		//加载更多
		onReachBottom(){
			this.recommendParams.pageNum++;
			this.loadingType = 'loading';
			fetchRecommendProductList(this.recommendParams).then(response => {
				let addProductList = response.data;
				if(response.data.length===0){
					//没有更多了
					this.recommendParams.pageNum--;
					this.loadingType = 'nomore';
				}else{
					this.recommendProductList = this.recommendProductList.concat(addProductList);
					this.loadingType = 'more';
				}
			})
		},
		computed: {
			cutDownTime() {
				let endTime = new Date(this.homeFlashPromotion.endTime);
				let endDateTime = new Date();
				let startDateTime = new Date();
				endDateTime.setHours(endTime.getHours());
				endDateTime.setMinutes(endTime.getMinutes());
				endDateTime.setSeconds(endTime.getSeconds());
				let offsetTime = (endDateTime.getTime() - startDateTime.getTime());
				let endHour = Math.floor(offsetTime / (60 * 60 * 1000));
				let offsetMinute = offsetTime % (60 * 60 * 1000);
				let endMinute = Math.floor(offsetMinute / (60 * 1000));
				let offsetSecond = offsetTime % (60 * 1000);
				let endSecond = Math.floor(offsetSecond / 1000);
				return {
					endHour: endHour,
					endMinute: endMinute,
					endSecond: endSecond
				}
			}
		},
		filters: {
			formatTime(time) {
				if (time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'hh:mm:ss')
			},
		},
		methods: {
			/**
			 * 加载数据
			 */
			async loadData() {
				fetchContent().then(response => {
					console.log("onLoad", response.data);
					this.advertiseList = response.data.advertiseList;
					this.swiperLength = this.advertiseList.length;
					this.titleNViewBackground = this.titleNViewBackgroundList[0];
					this.brandList = response.data.brandList;
					this.homeFlashPromotion = response.data.homeFlashPromotion;
					this.newProductList = response.data.newProductList;
					this.hotProductList = response.data.hotProductList;
					fetchRecommendProductList(this.recommendParams).then(response => {
						this.recommendProductList = response.data;
						uni.stopPullDownRefresh();
					})
				});
			},
			navToDetailPage(item) {
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
	}
	
</script>

<style lang="scss">
.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		
		.image-wrapper-brand {
			width: 100%;
			height: 150upx;
			border-radius: 3px;
			overflow: hidden;
		
			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.title2 {
			font-size: $font-sm;
			color: $font-color-light;
			line-height: 40upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}

</style>
