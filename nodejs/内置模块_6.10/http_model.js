//创建自己 web 服务器
//1:加载http模块
const http = require("http");
const fs = require("fs");
//2:创建http对象
var server = http.createServer();
//3:绑定一个监听端口 8081
server.listen(8081);
//4:为http对象绑定事件 on request
//  每一次客户请求都会触发事件
//req:request  请求对象(客户端信息)
//res:response 响应对象(服务器信息)
server.on("request",function(req,res){
  console.log(1111);
//5:解析客户请求消息
  console.log("请求方式"+req.method);
  console.log("请求地址"+req.url);
  console.log("请求协议版本"+req.httpVersion);
  console.log("请求头"+req.headers);
//6:获取请求程序地址
  var path = req.url;
  if(path=="/index.html") {
  //console.log("index.html");
  //7:依据地址读取文件
  //8:向客户端发送文件
  fs.readFile("./public/index.html",(err,data)=>{
      if(err)throw err;
      //向客户端浏览器发送文件内容
      res.write(data);
      //告诉客户端发送完成
      res.end();
  });
  }
});

//=======================================================
//1:加载http模块
const http = require("http");
//2:创建服务器对象
var server = http.createServer();
//3:绑定监听端口
server.listen(8081);
//4:绑定事件request
server.on("request",(req,res)=>{
//输出指定内容格式与编码
res.setHeader("Content-Type","text/html;charset=utf-8");
//5:输出
res.write("<h1>你好:网站正在升级中请5秒后再试</h1>");
res.end();//通知客户端响应消息己经结束
});


//1:运行浏览器出错
//http://127.0.0.1:8081/
//原因:请求地址/ 没处理
//     请求地址/index.html 获取网页并且发送
//解决:
//地址栏输入
//http://127.0.0.1:8081/index.html

//2:地址栏查找文件 用户请求index.html
//读取文件 fs.readFile("./public/index.html")
//??? 用户public/index.html
//    读取public/index.html