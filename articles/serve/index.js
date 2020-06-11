// 初始化express

const express = require('express')
const app = express()

// import express from 'express'
// const app = express()


app.use(require('cors')())
app.use(express.json())

// 初始化数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/article-admin',{
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
})

const Article = mongoose.model('Article', new mongoose.Schema({
    title: { type: String },
    body: { type:String },
}))

app.get('/', (req, res) => {res.send('成功连接数据库')})

//新增文章
app.post('/api/articles', async (req, res) => {
    //request的数据在request的body里面
    const article = await Article.create(req.body)
    console.log(article)
    res.send(article)
})
//获取所有文章
app.get('/api/articles', async (req, res) => {
    //request的数据在request的body里面
    const article = await Article.find()
    console.log(article)
    res.send(article)
})

//删除文章
app.delete('/api/articles/:id', async (req, res) => {
    //request的数据在request的body里面
    await Article.findByIdAndDelete(req.params.id)
    res.send('删除成功')
})

//修改文章
app.put('/api/articles/:id', async (req, res) => {
    //request的数据在request的body里面
    await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send('修改成功')
})


// 获取单篇文章
app.get('/api/articles/:id', async (req, res) => {
    //request的数据在request的body里面
    const article = await Article.findById(req.params.id)
    res.send(article)
})


app.listen(3001, ()=>{
    console.log('http://localhost:3001/')
})
