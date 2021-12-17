<template>
  <div id="upload">
      <el-upload
        class="upload-demo"
        ref="upload"
        name="upload"
        :on-error="error"
        :on-success="success"
        action="http://localhost:8888/upload"
        :file-list="fileList"
        accept=".json"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传json文件哦</div>
</el-upload>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      success(){
            this.$message.success('上传成功')
      },
      error(){
          this.$message.error('上传失败')
      }
    }
  }
</script>

<style>

</style>