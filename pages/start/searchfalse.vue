<template>
  <view>
	  <text class="title">没有搜索到相关物品</text>
	  <uni-load-more :status="loadingType"></uni-load-more>
  </view>
  
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		
		computed: {},
		methods: {
			
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
.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
</style>
