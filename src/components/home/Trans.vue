<template>
  <div class="centered-container">
    <el-form :model="formData" class="form" ref="formData" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="formData.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
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
  height: 100vh;
  border: 1px solid #ccc; /* 添加边框样式 */
  border-radius: 5px; /* 添加边框圆角 */
}

.form {
  width: 400px;
  margin-top: -20px;
}
</style>
