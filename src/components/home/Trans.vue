<template>
  <div class="centered-container">
    <div class="form-container">
      <div class="upload-container">
        <el-upload
            class="upload-demo"
            drag
            action="http://localhost:9090/temp/upload"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">此文件不会长期保存，大小不超过20MB</div>
        </el-upload>
      </div>
      <div style="height: 10%"></div>
      <el-form :model="formData" class="form" ref="formData" label-width="80px">
        <div class="form-row">
          <el-form-item label="取件码" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item">
            <el-button type="primary" @click="submitForm" class="submit-btn">获取</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        age: null
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          alert('提交成功');
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  padding: 20px;
  height: 500px;
}

.upload-container {
  margin-bottom: 20px;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-form-item {
  margin-bottom: 10px;
}

.submit-btn {
  margin-left: -60px;
}
</style>
