var gulp = require('gulp');
var css = require('gulp-clean-css');
gulp.task('mincss', function () {
    gulp.src('css/*.css')
        .pipe(css({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
});


htmlmin = require('gulp-htmlmin');
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
gulp.task('watch',function(){
    gulp.watch('css/*.css',['mincss']);
})



imagemin = require('gulp-imagemin');
gulp.task('imagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});

//深度压缩图片
    imagemin = require('gulp-imagemin'),
    //确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    pngquant = require('imagemin-pngquant');
   
gulp.task('imagemin_2', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});


sass = require("gulp-sass");

gulp.task('sass', function () {
    gulp.src('sass/*.sass')
    .pipe(sass({outputStyle: 'compressed'}))//Type: String Default: nested Values: nested, expanded, compact, compressed

Determines the output format of the final CSS style.
    .pipe(gulp.dest('dist/css'));
});


less = require("gulp-less");

gulp.task('less', function () {
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});


less = require('gulp-less'),
     //确保本地已安装gulp-sourcemaps [cnpm install gulp-sourcemaps --save-dev]
sourcemaps = require('gulp-sourcemaps');
   
gulp.task('testLess', function () {
    gulp.src('src/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'));
});


concat = require('gulp-concat');
gulp.task('concat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});


uglify= require('gulp-uglify');
   
gulp.task('uglify', function () {
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {reserved: ['require' ,'exports' ,'module' ,'$']},//排除混淆关键字
             mangle: true,//类型：Boolean 默认：true 是否修改变量名
            output:{
	        	comments:true
	        } //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'));
});


var jshint = require("gulp-jshint");  
gulp.task("jshint",function(){  
   gulp.src("src/js/*.js")  
      .pipe(jshint())  
      .pipe(jshint.reporter("stylish"))  
      //.pipe(jshint.reporter("jshint-stylish"))  //或直接引用，不使用上一行的方式  
}); 

var map = require("map-stream");  
var customerReporter = map(function(file,cb){  
    if(!file.jshint.success){  
       //打印出错误信息  
       console.log("jshint fail in:" + file.path);  
       file.jshint.results.forEach(function(err){  
           if(err){  
              console.log(err);  
              console.log("在 "+file.path+" 文件的第"+err.error.line+" 行的第"+err.error.character+" 列发生错误");  
           }  
       });  
    }  
});  

gulp.task("scripts",function(){  
   gulp.src("src/js/*.js")  
      .pipe(jshint())  
      .pipe(customerReporter);  
});

//Example
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');
   
gulp.task('javascript', function() {
gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'));
})


 autoprefixer = require('gulp-autoprefixer');
 
gulp.task('testAutoFx', function () {
    gulp.src('src/css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});




var browserSync = require('browser-sync').create();// 静态服务器
gulp.task('browser-sync', function() {
    var files = [
       'pages/*.html',
       'css/*.css',
       'js/*.js'
    ];
   browserSync.init({
     server: { baseDir: "./ss.html" } 
   });
});// 代理
gulp.task('browser-sync', function() {
 browserSync.init({ proxy: "你的域名或IP" });
});//这个可以注释掉，不写也行。目前我还没有发现这个的用法
gulp.task('watch', function () {
   gulp.watch([
        'css/*.css',
        'pages/*.html',
        'js/*.js'
   ], ['browser-sync']);
 });
gulp.task('default', ['browser-sync','watch']);





 gulp.task('run', () => {
        browserSync.init({      // 启动Browsersync服务
            server: {
                baseDir: './dev',   // 启动服务的目录 默认 index.html    
                index: 'index.html' // 自定义启动文件名
            },
            open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
            injectChanges: true // 注入CSS改变
        });

        // 监听文件变化，执行相应任务
        gulp.watch('./app/styles/**/*.scss', ['sass']);
        gulp.watch('./app/scripts/**/*.js', ['babel-js']);
        gulp.watch('./app/imgs/**/*.{png,jpg,gif,ico}', ['move-img']);
        gulp.watch('./app/_data/*.json', ['move-json']);
        gulp.watch('./app/**/*.html', ['move-html']).on('change', reload);
    })
 



var rename = require("gulp-rename");
 
// rename via string 
gulp.src("./src/main/text/hello.txt")
  .pipe(rename("main/text/ciao/goodbye.md"))
  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/goodbye.md 
 
// rename via function 
gulp.src("./src/**/hello.txt")
  .pipe(rename(function (path) {
    path.dirname += "/ciao";
    path.basename += "-goodbye";
    path.extname = ".md"
  }))
  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/hello-goodbye.md 
 
// rename via hash 
gulp.src("./src/main/text/hello.txt", { base: process.cwd() })
  .pipe(rename({
    dirname: "main/text/ciao",
    basename: "aloha",
    prefix: "bonjour-",
    suffix: "-hola",
    extname: ".md"
  }))
  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/bonjour-aloha-hola.md





//清空文件夹
 gulp.task('clean-dev', (cb) => {
        return del(['./dev/**/*'], cb);
    })
 /* 
        编译 
        清空 /dev 文件夹，将 html、编译后的css、编译后的js、libs中文件、图片、json文件引入
    */
    gulp.task('dev', (cb) => {
        // [] 中任务是并行的，其他按照先后顺序执行
        runSequence('clean-dev', 'move-html', [     
            'sass', 'babel-js', 'move-libs-dev'
        ], 'move-img', 'move-json', cb)
    })
    

{
	 //定义脚本命令
	scripts:{
        "dev": "gulp dev",
        "run": "gulp run",
        "build": "cross-env NODE_ENV='production' gulp build",
        "build-test": "cross-env NODE_ENV='production' gulp build-test"
    }
}
