<template>
      <el-table :data="articles">
        <el-table-column  prop="title"  label="标题" width="140" >
        </el-table-column>
        <el-table-column type="textarea" prop="body"  label="文章内容" width="auto" >
        </el-table-column>
            <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <!-- {{scope.row.id}} -->
        <!-- {{scope.row}} -->
        <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      
</template>

<script>
export default {
  data(){
    return {
      articles:[],
    }
  },
  methods:{
    fetch(){
      this.$http.get('/api/articles').then((res) =>{
        this.articles = res.data
        // console.log(res.data)
      })
    },
    edit(id){
      this.$router.push(`/articles/${id}/edit`)
    },
    remove(id){
      this.$http.delete(`/api/articles/${id}`, {data:{id}}).then(res =>{
        this.$message({
          message: res.data,
          type:'success'
        }),
        this.fetch()
      });
    },
  },
  created(){
    this.fetch()
  }
}
</script>

<style>
.form-col{
  border: 2px solid red !important;
  width: 80vw;
}
</style>