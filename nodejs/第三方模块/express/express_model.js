//项目主程序
//1:加载相关模块 http express mysql qs
const http = require("http");
const express = require("express");
const mysql = require("mysql");
const qs = require("querystring");
//2:创建连接池  25
var pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"jd",
  port:3306,
  connectionLimit:25
});
//3:创建express对象
var app = express();
//4:创建服务器对象
var server = http.createServer(app);
//5:绑定监听端口
server.listen(8081);
//6:处理所有静态文件
//express提供非常实用功能:静态文件中间件(函数)
//你指需要指定(目录)  public
//该目录下所有静态资源请求，读取，发送，帮助我们自动完成
//示例:首页   http://127.0.0.1:8081/index.html
app.use(express.static("public"));

//7:模块一:用户登录
app.post("/login",(req,res)=>{
  //1:获取用户参数 uname upwd
  req.on("data",(data)=>{
    var str = data.toString();
    var obj = qs.parse(str);
    //2:获取数据库连接
    pool.getConnection((err,conn)=>{
      if(err)throw err;
      //3:创建sql语句并且发送SQL
      var sql = "SELECT * FROM jd_user";
      sql += " WHERE uname=? AND upwd=?";
      conn.query(sql,[obj.uname,obj.upwd],(err,result)=>{
        if(err)throw err;
        //4:返回结果并且判断  result.length
        if(result.length<1){
          res.json({code:-1,msg:"用户名或密码不正确"});
        }else{
          res.json({code:1,"msg":"登录成功",uid:result[0].uid});
        }
        conn.release();
        //5:{code:1,msg:"登录成功",uid:1}
      });
    });
  });
});
//get() 处理get请求
//app.get(url,function(req,res))
app.get("/index.html",(req,res)=>{
  //readFile+setHeader+write+end
  res.sendFile(__dirname+"/public/index.html");
});
//Express请求处理函数提供 404 响应处理
//6:处理请求 /admin.do 输出字符串
app.get("/admin.do",(req,res)=>{
  //setHeader+write+end
  res.send("<h1>express app</h1>");
})
//7:处理请求 /code 输出json字符串
app.get("/code",(req,res)=>{
  //var obj = {uid:2,uname:"qd",upwd:"123"};
  var obj = [{uid:1,uname:"tom"},
             {uid:2,uname:"jerry"}];
  res.json(obj);
});


