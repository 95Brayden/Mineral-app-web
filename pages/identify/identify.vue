<!-- /* <template>
	<div class="container">
		<div class="appraisal-form">
		  <h2>珠宝鉴定</h2>
		  <div class="input-group">
		    <label for="jewelry-type">珠宝类型：</label>
		    <select id="jewelry-type" v-model="jewelryType" class="form-control">
		      <option value="" disabled selected>请选择类型</option>
		      <option value="necklace">项链</option>
		      <option value="ring">戒指</option>
		      <option value="bracelet">手链</option>
		      <!-- 其他珠宝类型
		    </select>
		  </div>
		  <div class="input-group">
		    <label for="jewelry-description">珠宝描述：</label>
		    <textarea id="jewelry-description" v-model="jewelryDescription" rows="4" class="form-control"></textarea>
		  </div>
		  <div class="input-group">
		    <label for="jewelry-image">上传图片：</label>
		    <input type="file" id="jewelry-image" @change="handleImageUpload" class="form-control">
		  </div>
		  <div class="input-group">
		    <label>鉴定类型：</label>
		    <div class="checkboxes">
		      <label><input type="checkbox" v-model="appraisalTypes['gemstone']"> 宝石</label>
		      <label><input type="checkbox" v-model="appraisalTypes['metal']"> 金属</label>
		      <!-- 其他鉴定类型
		    </div>
		  </div>
		  <button @click="submitAppraisal" class="btn btn-primary">提交鉴定</button>
		</div>
	</div>
  
</template>

<script>
export default {
  data() {
    return {
      jewelryType: '',
      jewelryDescription: '',
      jewelryImage: null,
      appraisalTypes: {
        gemstone: false,
        metal: false
        // 其他鉴定类型
      }
    };
  },
  methods: {
    handleImageUpload(event) {
      this.jewelryImage = event.target.files[0];
    },
    submitAppraisal() {
      // 处理提交鉴定的逻辑，比如发送请求到后端
      console.log('珠宝类型:', this.jewelryType);
      console.log('珠宝描述:', this.jewelryDescription);
      console.log('上传图片:', this.jewelryImage);
      console.log('鉴定类型:', this.appraisalTypes);
    }
  }
};
</script>

<style scoped>
.appraisal-form {
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group textarea,
.input-group input[type="file"],
.input-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.checkboxes {
  display: flex;
}

.checkboxes label {
  margin-right: 20px;
}

.btn {
  width: 400upx;
  height: 76upx;
  line-height: 76upx;
  border-radius: 50px;
  margin-top: 70upx;
  background: $uni-color-primary;
  color: black;
  font-size: $font-lg;
  
  &:after {
  	border-radius: 100px;
  }
}

.btn:hover {
  background-color: #0056b3;
}

.container {
  background-image: url('~@/static/bg.jpg');
  background-size: cover; 
  background-position: center; 
  height:100vh;
  weight:100vw;
}
</style>
