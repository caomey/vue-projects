<template>


<el-form ref="form" :model="article" @submit.native.prevent="saveArticle" label-width="80px"  style="width: 60vw;">
  <el-form-item label="文章标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="article.body"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" native-type="submmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

  
</template>
<script>
  export default {
    data() {
      return {
        article: {}
      }
    },
    methods: {
      saveArticle() {
      this.$http.post("/api/articles", this.article).then(res => {
        this.$message({
          message: "文章创建成功",
          type: "success",
        });
        this.$router.push("/articles/index");
      });
    },
    },
    }
</script>