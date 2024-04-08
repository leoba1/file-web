<template>
  <div class="centered-container">
    <div class="form-container">
      <div class="upload-container">
        <el-upload
            class="upload-demo"
            drag
            action="http://localhost:9090/temp/upload"
            :on-success="uploadFiles"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">此文件不会长期保存，大小超过20MB不能上传</div>
        </el-upload>
      </div>
      <div style="height: 10%"></div>
      <el-form :model="formData" class="form" ref="formData" label-width="80px" :rules="formRules">
        <div class="form-row">
          <el-form-item label="取件码" prop="code">
            <el-input v-model="formData.code"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item">
            <el-button type="primary" @click="submitForm" class="submit-btn">获取</el-button>
          </el-form-item>
        </div>
      </el-form>
<!--      <div v-if="fileInfo" class="file-info" @click="handleClickFileInfo">-->
<!--        <div class="file-info-details">-->
<!--          <p class="file-info-item">文件名: {{ fileInfo.fileName }}</p>-->
<!--          <p class="file-info-item">上传时间: {{ fileInfo.time }}</p>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      formData: {
        code: '',
      },

      fileInfo: null,
      backCode: null,
      formRules: {
        code: [
          { required: true, message: '请输入取件码', trigger: 'blur' },
          { min: 6, max: 6, message: '取件码长度必须为6位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      } catch (err) {
        console.error('无法复制文本: ', err);
        this.$message.error('复制失败');
      }
    },
    msg() {
      this.$alert(this.backCode, '请记下取件码', {
        confirmButtonText: '复制',
        callback: action => {
          if (action === 'confirm') {
            this.copyToClipboard(this.backCode);
          }
        },
      });
    },
    uploadFiles(res){
      console.log(res.data)
      console.log(res)
      this.backCode = res.data
      this.msg()
    },

    async submitForm() {
      await this.$refs.formData.validate();
      try {
        const response = await axios.get('temp/search/'+ this.formData.code);
        this.fileInfo = response.data.data;
        if(response.data.code !== '0'){
          this.$message.error("文件不存在!")
        } else {
          const uploadTime = new Date(this.fileInfo.time);
          const formattedTime = uploadTime.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          this.$alert(`文件名: ${this.fileInfo.fileName}上传时间: ${formattedTime}`, '获取文件', {
            confirmButtonText: '下载',
            callback: action => {
              if (action === 'confirm') {
                this.handleClickFileInfo()
                this.formData.code = null
              }
            },
          });
        }
      } catch (error) {
        this.$message.error("发生错误")
        console.error('Error:', error);
      }
    },
    handleClickFileInfo() {
      window.open('http://localhost:9090/temp/download/'+ this.formData.code, '_blank');
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
.file-info {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info:hover .file-info-hover {
  display: block;
}

.file-info-details {
  flex: 1;
}

.file-info-item {
  margin: 5px 0;
}

.file-info-hover {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.download-btn {
  color: #007bff;
  cursor: pointer;
  padding: 0;
}

.download-btn:hover {
  text-decoration: underline;
}
</style>
