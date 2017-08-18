//0:检查数据库是否正常启动
//  jd/jd_user 添加一条记录
//1:加载mysql模块
const mysql = require("mysql");
//2:创建连接对象
var conn = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"jd",
  port:3306
});
//可以使用占位符方式解决安全问题
//在SQL语句中添加
// INSERT INTO jd_user values(null,?,?)
// ["tom","123"]
var sql = "INSERT INTO jd_user VALUES(null,?,?)";
conn.query(sql,["tom3","123"],(err,result)=>{
     if(err)throw err;
     if(result.affectedRows>0){
        console.log("添加成功");
     }else{
        console.log("添加失败");
     }
     conn.end();//关闭连接
});

//=====================================================
//2:创建连接池(池 提高效率)
var pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"jd",
  port:3306,
  connectionLimit:10  //连接池大小
});
//3:获取连接 conn 租连接
pool.getConnection((err,conn)=>{
  if(err)throw err;
  //4:创建SQL并且发送SQL
  var sql = "UPDATE jd_user SET upwd=? WHERE uid=?";
  conn.query(sql,["111",2],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){//操作影响行数
        console.log("更新成功");
    }else{
        console.log("更新失败");
    }
    conn.release();//5归还连接
  });
});
//错误集锦
//getaddrinfo ENOTFOUND
//错误地址出错 127.0.0.1

//SQL syntax
//SQL拼写错误

//Column count doesn't match
// value count at row
//列数量不匹配
//(uid,uname,upwd)
//insert into jd values(1,'tom')





