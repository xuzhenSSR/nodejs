
//异步文件复制
//1:加载模块
const fs = require("fs");
//2:创建二个变量 源文件 目标文件
var src="./public/4.css";
var des="./public/44.backup.css";
//3:文件读取
fs.readFile(src,function(err,data){
    if(err)throw err;
    console.log("文件读取文件");
    //4:文件写 
    //data读到的文件
    fs.writeFile(des,data,function(err){
      if(err)throw err;
      console.log("文件复制完成");
    });

});
//不清空追加 
fs.appendFile("./public/user.db","一行记录",(err)=>{
      res.write("file save ok");
  	  res.end();
  });

//异步:(Asynchronize) 向文件中写内容
var str = new Date().toString();
fs.writeFile("./public/5.log",str,function(err){
 
});

//url 模块
const url = require("url");
var u = "http://www.jd.com:443/ad/index?uname=qd";
var obj = url.parse(u);
//console.log(obj);
//true:指定对URL中的查询字符串进行进一步解析,
var obj2 = url.parse(u,true); //解析查询字符串:
console.log(obj2.query.uname); //参数对象属性

//加载原生模块 querystring
//功能:处理查询字符串
//qs.parse(str);    将查询字符串转换js对象
//qs.stringify(obj);js对象转换查询字符串
//加载其它模块:通常不需要修改只使用
const qs = require("querystring");
var str = "uname=tom&upwd=123&age=19";
//把客户端传递给 node.js服务器查询字符串解析
//容易使用JS对象
var obj = qs.parse(str);
console.log(obj);

//把一个JS对象转抡为查询字符串格式
var obj2 = {ename:"强东",age:20,addr:"bj"};
str = qs.stringify(obj2);
console.log(str);
//ename=%E5%BC%BA%E4%B8%9C&age=20&addr=bj
