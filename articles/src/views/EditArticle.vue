<template>


<el-form ref="form" :model="article" @submit.native.prevent="saveArticle" label-width="80px"  style="width: 60vw;">
  <el-form-item label="文章标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="article.body"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" native-type="submmit">确定修改</el-button>
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
        this.$http.put(`/api/articles/${this.$route.params.id}`, this.article).then(res => {
        // console.log(this.article)
        this.$message({
          message: res.data,
          type: "success",
        });
        this.$router.push("/articles/index");
      });
    },
    },
    created(){
      // console.log(this.$route.params.id)
      var id = this.$route.params.id
      // console.log(id)
      this.$http.get(`/api/articles/${id}`, {data:{id}}).then(res =>{
        // console.log(res.data)
        this.article = res.data
      })
    }
    }
</script>