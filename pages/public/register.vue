<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎注册！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input type="text" v-model="username" placeholder="请输入用户名" maxlength="11"/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="text" v-model="password" placeholder="8-18位不含特殊字符的数字、字母组合" placeholder-class="input-empty" maxlength="20"
					 password @confirm="toRegister" />
				</view>
				<view class="input-item">
					<text class="tit">确认密码</text>
					<input type="text" v-model="repassword" placeholder="8-18位不含特殊字符的数字、字母组合" placeholder-class="input-empty" maxlength="20"
					 password @confirm="toRegister" />
				</view>
				<view class="input-item">
					<view class="phone-input-wrapper">
						<input type="text" v-model="telephone" placeholder="请输入手机号" maxlength="11"/>
						<button class="phone-input-btn" @click="sendVerificationCode" :disabled="countdown > 0">
							{{ countdown > 0 ? countdown + 's' : '验证码' }}
						</button>
					</view>
					
				</view>
				<view class="input-item">
					<input type="text" v-model="authCode" placeholder="请输入验证码" maxlength="11"/>
				</view>
			</view>
			<button class="confirm-btn" @click="toRegister" :disabled="registering">注册</button>
		</view>
		<view class="register-section">
			<text @click="toWeChat">微信注册</text>
		</view>
	</view>
</template>

<script>
	import axios from 'axios';
	import {
		mapMutations
	} from 'vuex';
	import {
		memberLogin,memberInfo, memberRegister
	} from '@/api/register.js';
	export default {
		data() {
			return {
				username: '',
				password: '',
				telephone: '',
				authCode:'',
				repassword: '',
				registering: false,
				countdown: 0,
				timer: null
			}
		},
		onLoad() {
			this.username = uni.getStorageSync('username') || '';
			this.password = uni.getStorageSync('password') || '';
			this.telephone = uni.getStorageSync('telephone') || '';
			this.authCode = uni.getStorageSync('authCode') || '';
		},
		methods: {
			...mapMutations(['register']),
			toWeChat() {
				uni.navigateTo({url:'/pages/public/wechat'});
			},
			navBack() {
				uni.navigateBack();
			},
			sendVerificationCode() {
			        // 发送请求到后端接口
					console.log("Sending verification code...");
			        axios.get('/getAuthCode', {
			            params: {
			                telephone: this.telephone // 传递手机号作为参数
			            }
			        }).then(response => {
			            // 请求成功处理逻辑
			            this.countdown = 60; // 开始倒计时
			            this.timer = setInterval(() => {
			                if (this.countdown > 0) {
			                    this.countdown--;
			                } else {
			                    clearInterval(this.timer);
			                    this.timer = null;
			                }
			            }, 1000);
			            console.log('验证码已发送：', response.data);
			        }).catch(error => {
			            // 请求失败处理逻辑
			            console.error('发送验证码失败：', error);
			        });
			    },
			async toRegister() {
				this.registering = true;
				memberRegister({
					username: this.username,
					password: this.password,
					telephone: this.telephone,
					authCode:this.authCode
				}).then(response => {
					let token = response.data.tokenHead+response.data.token;
					uni.setStorageSync('token',token);
					uni.setStorageSync('username',this.username);
					uni.setStorageSync('password',this.password);
					uni.setStorageSync('telephone', this.telephone);
					uni.setStorageSync('authCode',this.authCode);
					memberInfo().then(response=>{
						this.register(response.data);
						uni.navigateBack();
					});
				}).catch(() => {
					this.registering = false;
				});
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
		overflow: hidden;
		background: #fff;
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
	
	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
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
	
	.confirm-btn2 {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 40upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
	
		&:after {
			border-radius: 100px;
		}
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
