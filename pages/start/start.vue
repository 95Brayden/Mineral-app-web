<template>
	
  <view class="startup-page">
    <img src="@/static/start.jpg" alt="Logo">
    <h1>Welcome to Mineral</h1>
    <p>Loading...</p>
	<button @click="redirectToIndex()">跳转到首页</button>
	<view class="cate-item" @click="navToCommodityList()">
		<image src="/static/temp/c3.png"></image>
	</view>
	<view class="cate-item" @click="navToIndex()">
		<image src="/static/temp/c3.png"></image>
	</view>
  </view>
</template>

<script>
	import empty from "@/components/empty";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		formatDate
	} from '@/utils/date';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		methods: {
			navToIndex(){
				try {
				    uni.navigateTo({
				      url: `/pages/index/index`
				    });
				  } catch (error) {
				    console.error('跳转失败', error);
				  }
			},
			navToCommodityList() {
				uni.navigateTo({
					url: `/pages/product/product`
				})
			},
		},
	}
</script>

<style>
.startup-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.startup-page img {
  width: 500px;
  height: 500px;
}

.startup-page h1 {
  font-size: 24px;
  margin-top: 20px;
}

.startup-page p {
  font-size: 16px;
  margin-top: 10px;
}
</style>
