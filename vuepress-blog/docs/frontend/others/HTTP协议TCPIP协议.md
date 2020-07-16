# Http协议与TCP/IP协议

区别：

- TPC/IP协议是传输层协议
- HTTP是应用层协议
- HTTPS 是以安全为目标的 HTTP 通道，简单讲是 HTTP 的安全版，即 HTTP 下加入 SSL 层

## HTTP协议

**http工作的简单过程**

1. 地址解析： DNS解析
2. 封装HTTP请求数据包： 把以上部分结合本机自己的信息，封装成一个HTTP请求数据包
3. 封装成TCP包，建立TCP连接（TCP的三次握手）
4. 客户端发送请求命令
5. 服务器响应
6. 服务器关闭TCP连接（TCP四次挥手）



