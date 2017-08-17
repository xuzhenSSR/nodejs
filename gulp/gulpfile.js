
gulp=require('gulp');
sass = require("gulp-sass");
less = require("gulp-less");
htmlmin = require('gulp-htmlmin');
rename = require("gulp-rename");
autoprefixer = require('gulp-autoprefixer');
css = require('gulp-clean-css');
babel = require('gulp-babel');
jshint = require("gulp-jshint");  
browserSync = require('browser-sync').create();
uglify= require('gulp-uglify');
map = require("map-stream");  
stylish = require('jshint-stylish');s
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,//压
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('./*.html')
        .pipe(htmlmin(options))
        .pipe(rename({
		    suffix: "-min"
  		}))
        .pipe(gulp.dest('dist'));
});

 
gulp.task('fxmin', function () {
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 1000 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
      	.pipe(css({
            advanced: false,// 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
      	.pipe(rename({
		    suffix: "-min"
  		}))
        .pipe(gulp.dest('./dist/css'));
});

   
gulp.task('uglify', function () {
		var obj=
		{
          	mangle: {reserved:['require' ,'exports' ,'module' ,'$']},//排除混淆关键字
	        compress: true,//类型：Boolean 默认：true 是否完全压缩
	        output:{
	        	comments:true
	        }
        }
    gulp.src(['./js/*.js','!src/js/**/{test1,test2}.js'])
     	.pipe(babel({
            presets:['babel-preset-es2015']    //插件数组
        }))  //es6转es5
	      .pipe(uglify())
        .pipe(rename({
		    suffix: "-min"
  		}))
        .pipe(gulp.dest('dist/js'));
});

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
    cb()
});  
  
gulp.task("scripts",function(){  
   gulp.src("js/*.js")  
      .pipe(jshint())  
      .pipe(jshint.reporter('jshint-stylish')); 
      //console.log(jshint.reporter('jshint-stylish'));
});  

gulp.task('less', function () {
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});


gulp.task('Sass', function () {
    gulp.src('sass/*.scss')
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
     .pipe(autoprefixer({
            browsers: ['last 1000 versions'],
            cascade:false, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
     }))
    .pipe(gulp.dest('./css'));
});


 gulp.task('run', () => {
        browserSync.init({     
            server: {
                baseDir: './',       
                index: 'index.html' 
            },
            open: 'Local',  
            injectChanges: true 
        });
        gulp.watch('./sass/*.scss',['Sass']);
        //gulp.watch('./css/*.css',['fxmin']);
        //gulp.watch('./js/*.js',['uglify']);
        gulp.watch('./*.html',['htmlmin']).on('change',browserSync.reload);
    })
//ERROR SCRIPT