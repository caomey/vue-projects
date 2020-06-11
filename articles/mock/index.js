import Mock from "mockjs";

const { articles } = Mock.mock({
  "articles|3-5": [
    {
      title: "@title",
      body: "@paragraph",
      id: "@increment(1)",
    },
  ],
});

// 初始化文章
Mock.mock("/api/articles", "get", () => {
  return articles;
});
// 获取单篇文章
Mock.mock(RegExp("/api/articles/" + ".*"), "get", (req) => {
  const { id } = JSON.parse(req.body);
  // console.log(id)
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) {
      // console.log(articles[i])
      return articles[i];
    }
  }
});
// 删除文章
Mock.mock(RegExp("/api/articles/" + ".*"), "delete", (req, res) => {
  const { id } = JSON.parse(req.body);
  // console.log(id)
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) {
      articles.splice(i, 1);
    }
  }
  return "删除成功";
});

// 修改文章
Mock.mock(RegExp("/api/articles/" + ".*"), "put", (req, res) => {
  const body = JSON.parse(req.body);
  // console.log(body)
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == body.id) {
      articles[i] = body;
    }
  }
  return "修改成功";
});

// 添加文章
Mock.mock("/api/articles", "post", (req) => {
  const body = JSON.parse(req.body);
  console.log(body);
  articles.push(body);
});
