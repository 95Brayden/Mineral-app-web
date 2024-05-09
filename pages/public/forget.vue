<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="login-wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				手机号登录！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input type="text" v-model="username" placeholder="请输入用户名" maxlength="11"/>
				</view>
				<view class="input-item">
					<view class="phone-input-wrapper">
						<input type="text" v-model="phonenumber" placeholder="请输入手机号" maxlength="11"/>
						<button class="phone-input-btn" @click="sendVerificationCode" :disabled="countdown > 0">
							{{ countdown > 0 ? countdown + 's' : '验证码' }}
						</button>
					</view>
					
				</view>
				<view class="input-item">
					<input type="text" v-model="code" placeholder="请输入验证码" maxlength="11"/>
				</view>
			</view>
			<button class="confirm-btn2" @click="toLogin" :disabled="logining">登录</button>
		</view>
		<view class="register-section">
			<text @click="toWeChat">微信登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 countdown: 0,
				 timer: null
			}
		},
		onLoad() {
		},
		methods: {
			toWeChat() {
				uni.navigateTo({url:'/pages/public/wechat'});
			},
			navBack() {
				uni.navigateBack();
			},
			 sendVerificationCode() {
			            // 在这里处理发送验证码的逻辑，示例中直接触发倒计时
			            this.countdown = 60;
			            this.timer = setInterval(() => {
			                if (this.countdown > 0) {
			                    this.countdown--;
			                } else {
			                    clearInterval(this.timer);
			                    this.timer = null;
			                }
			            }, 1000);
		}

	},
}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}
	
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;
	
		image {
			width: 420upx;
			height: 420upx;
			margin-bottom: 30upx;
		}
		.empty-tips {
			display: flex;
			font-size: $font-sm+16upx;
			color: $font-color-disabled;
		
			.navigator {
				color: $uni-color-primary;
				margin-left: 0upx;
			}
		}
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.login-wrapper {
	        background-color: #fff;
	        width: 500px;
	        height: 588px;
	        border-radius: 15px;
	        padding: 0 50px;
	        font-family: sans-serif;
	    }

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	
	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}
	
	.input-content {
		padding: 0 60upx;
	}
	
	.input-item {
		display: flex;
		flex-direction: column;
		
		/* align-items: center; */
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
	
		&:last-child {
			margin-bottom: 0;
		}
	
		.tit {
			height: 50upx;
			line-height: 50upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		
		.tit2 {
			height: 50upx;
			line-height: 50upx;
			font-size: $font-sm;
			color: $font-color-base;
		}
	
		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
			line-height: 50upx;
		}
		
		.phone-input-btn{
			background: $page-color-light;
			width:300upx;
			height: 100%;
			margin-left: auto;
		}
		
		.phone-input-wrapper {
		    display: flex;
		    align-items: center;
			width: 100%
		}
	}
	
	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
	
		&:after {
			border-radius: 100px;
		}
	}
	
	.confirm-btn2{
		text-align: center;
		width: 500upx;
		margin-top: 40px;
		background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 18px;
		justify-content: center;
	}
	
	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	
	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
	
		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
