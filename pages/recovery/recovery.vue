
<template>
    <view class="content" v-if="seen">

        <form @submit="formSubmit" @reset="formReset">

            <view class="inputView">
                <text class="leftTitle">物品简介</text>
            </view>

            <textarea class="rightTextarea" name="direct" placeholder=" 请输入物品简介" />

            <view class="inputView">
                <text class="leftTitle">物品规格</text>
            </view>

            <textarea class="rightTextarea" name="village" placeholder=" 请输入物品规格" />

            <view class="inputView">
                <text class="leftTitle">添加证明及物品图片（仅可添加1张）</text>

            </view>

            <!-- photoList：选择的图片数组  @click：图片选择事件-->
            <cc-oneImgFileUpload :photoList="photoList" @click="addPhotoClick"></cc-oneImgFileUpload>

            <view class="uni-btn-v">
                <button class="botBtn" type="primary" form-type="submit">提交</button>
                <view class="tipText"> 注意事项: 请确保您填写的信息真实无误 </view>

            </view>
        </form>
    </view>
</template>

<script>
    import Vue from 'vue';

    export default {

        data() {

            return {
                photoList: [],
                seen: true,
                myParamData: {},
                isClick: false,

            };
        },

        methods: {

            formSubmit: function(e) {
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));

                if (this.isClick) {
                    let that = this;
                    setTimeout(function() {
                        that.isClick = false;
                    }, 600)
                    return;
                }
                this.isClick = true;

                var formdata = e.detail.value;
                this.myParamData = Object.assign(this.myParamData, formdata);

                console.log('页面3 myParamData=' + JSON.stringify(this.myParamData));

                if (formdata['direct'].length < 2) {
                    uni.showModal({
                        content: '请输入物品简介',
                        showCancel: false
                    });
                    return;
                }
                if (formdata['village'].length < 2) {
                    uni.showModal({
                        content: '请输入物品规格',
                        showCancel: false
                    });
                    return;
                }
                if (this.photoList.length < 1) {
                    uni.showModal({
                        content: '请添加证明及物品照片',
                        showCancel: false
                    });
                    return;
                }

                uni.showLoading({
                    title: '上传中'
                })
                let myFilePath = '';
                if (this.photoList.length > 0) {
                    myFilePath = this.photoList[0].filePath;
                }

                // 服务器地址上传地址 仅为示例，非真实的接口地址
                let baseUrl = "http://gzcc.com/cc//appSc/up"

                uni.uploadFile({
                    url: baseUrl, //仅为示例，非真实的接口地址
                    filePath: myFilePath, //文件路径
                    name: 'image', //服务端文件接受key
                    formData: this.myParamData,

                    success: (uploadFileRes) => {

                        uni.hideLoading();
                        let dataDic = JSON.parse(uploadFileRes.data);
                        console.log('uploadFileRes成功 = ' + JSON.stringify(uploadFileRes));
                        console.log('datadic成功 = ' + typeof(dataDic));
                        console.log('code码 = ' + dataDic['code']);

                    }
                });

            },
            addPhotoClick() {

                uni.hideLoading();

                let myThis = this;
                if (myThis.photoList.length >= 1) {
                    myThis.photoList = [];
                }
                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: function(res) {
                        myThis.photoList = [{
                            'filePath': res.tempFilePaths[0]
                        }];

                        console.log('选择图片 =' + JSON.stringify(myThis.photoList));
                    }
                });
            },

        }
    };
</script>

<style>
    .uni-form-item .title {
        padding: 20rpx 0;
    }

    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
    }

    .inputView {
        flex-direction: row;
        display: flex;
        height: 40px;
        align-items: center;
        width: 100%;
    }

    .line {
        width: 90%;
        height: 2rpx;
        margin-left: -2rpx;
        background-color: #f8f8f8;
        margin-left: 5%;
    }

    .leftTitle {
        margin-left: 40rpx;
        width: 284px;
        height: 32px;
        line-height: 32px;
        font-size: 28rpx;
        color: #333333;
    }

    .rightTextarea {

        margin-left: 5%;
        width: 90%;
        height: 106px;
        line-height: 40rpx;
        border-radius: 12rpx;
        border: solid 1px #F5F5F5;
        font-size: 15px;
    }

    .uni-btn-v {
        width: 100%;
        height: auto;
    }

    .botBtn {
        width: 90%;
        margin-top: 36px;
        height: 48px;
    }

    .tipText {
        width: 100%;
        margin-left: 0px;
        text-align: center;
        color: #666666;
        margin-top: 36px;
        margin-bottom: 36px;
        font-size: 28rpx;
    }
</style>