"use strict";
const gulp = require('gulp');//使用gulp
const babel = require('gulp-babel');//es6转es5
const es2015Preset = require('babel-preset-es2015-node5');//es6转es5
const browserify = require('gulp-browserify');//js打包
const uglify = require('gulp-uglify');//js混淆压缩
const rename = require('gulp-rename');//文件重命名
const pug = require('gulp-pug');//使用pug文件
const prettify = require('gulp-jsbeautifier');//文件格式美化
const less = require('gulp-less');//使用less文件
const rm = require('gulp-rm');//删除文件
const replace = require('replace-in-file');//文件中替换字符串
const combiner = require('stream-combiner2');//错误处理
const browserSync = require('browser-sync').create();//浏览器实时刷新，响应文件变化
const serverFactory = require('spa-server');//单页应用使用的服务器
const exec = require('child_process').exec;
const config = require('../dev.config');//配置文件

//使用脚手架
gulp.task('default',['transform','webserver','browser-sync','watch'],function(){
	//console.log('启动完毕！');
});

//转换es6,pug,less
gulp.task('transform',['pack','pug','less'],function(){
	//console.log('文件转换成功');
})

//js打包，依赖es6转es5任务
gulp.task('pack',['es6to5'],function(){//任务a依赖任务长时b
	var combined = combiner.obj([
		gulp.src(config.packBegin),
		browserify(),
		// uglify(),
		rename({
			basename:config.renameBasename,
			suffix:config.renameSuffix
		}),
		gulp.dest(config.packEnd)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
});

//es6转成es5
gulp.task('es6to5',function(){
	var combined = combiner.obj([
		gulp.src(config.esTransBegin),
		babel({
			presets:[es2015Preset]
		}),
		gulp.dest(config.esTransEnd)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
});

//pug转html，并且美化格式
gulp.task('pug',function(){
	var combined = combiner.obj([
		gulp.src(config.pugSrc),
		pug(),
		prettify({
			"indent_size":4
		}),
		gulp.dest(config.htmlSrc)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
});

//less转css
gulp.task('less',function(){
	var combined = combiner.obj([
		gulp.src(config.lessSrc),
		less(),
		gulp.dest(config.cssSrc)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
});

//开启服务器
gulp.task('webserver',function(){
	var server = serverFactory.create({
		path:'./',
		port:config.pagePort
	});

	server.start();
});

//刷新浏览器
gulp.task('browser-sync',function(){
	browserSync.init({
		proxy:config.pageLink
	});
});

//监视文件变化，执行响应的任务
gulp.task('watch',function(){
	gulp.watch(config.watchEs6Src,['pack']);
	gulp.watch(config.watchpugSrc,['pug']);
	gulp.watch(config.watchLessSrc,['less']);
	gulp.watch(config.devSrc,browserSync.reload);
});

//初始化，重命名原有文件
gulp.task('init',['rmfile'],function(){
	exec('gulp transform',function(){
		console.log('初始化成功!');
	});
});

//删除默认的文件
gulp.task('rmfile',['rename'],function(){
	var combined = combiner.obj([
		gulp.src('**/demo.*'),
		rm()
	]);

	combined.on('error',console.error.bind(console));
	return combined;
});

//重命名文件
gulp.task('rename',['replace'],function(){
	for(var i = 0;i < config.initRename.length;i++){
		+function(i){
			var combined = combiner.obj([
				gulp.src(config.initRename[i]),
				rename({
					basename:config.fileName,
				}),
				gulp.dest(config.initRename[i].substring(0,config.initRename[i].indexOf('demo')))
			])
		}(i)
	}
});

//替换文件中的字符串
gulp.task('replace',function(){
	try {
		const changedFiles = replace.sync(config.initReplaceOption);
		console.log('Modifued files:',changedFiles.join(','));
	}
	catch (error){
		console.error('Error occurrred',error);
	}
});
