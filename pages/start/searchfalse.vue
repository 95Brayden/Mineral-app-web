<template>
  <view class="container">
	   <text class="text-nothing">没有搜索到相关物品</text>
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
		.text-nothing {
			font-size: 28upx;
			color: #999
		}
			
		.container{
			display: flex;
			justify-content: center;
		}
</style>
