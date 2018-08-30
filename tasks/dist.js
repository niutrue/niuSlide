'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const copy = require('copy');
const replace = require('replace-in-file');
const exec = require('child_process').exec;
const rename = require('gulp-rename');
const rm = require('gulp-rm');
const distConfig = require('../dist.config.js');

//构建生产环境的代码  复制 --> 删除 --> 压缩 ，之后还可以进行字符串的替换
gulp.task('build',['copy'],function(){
    //console.log('构建成功！');
});

//复制代码
gulp.task('copy',function(){
    copy(distConfig.copyBegin,distConfig.copyEnd,function(err,files){
        //console.log('代码复制完毕！');
        exec('gulp compress',function(){
    		console.log('生产环境代码构建完毕!');
            //这里可以继续写人物
    	});
    });
});

//压缩混淆js
gulp.task('compress',['cleancopyjs'],function(){
    gulp.src(distConfig.compressBegin)
    .pipe(uglify())
    .pipe(rename({
        basename:distConfig.fileName,
        suffix:'.min'
    }))
    .pipe(gulp.dest(distConfig.compressEnd))
});

//删除不需要的文件
gulp.task('cleancopyjs',function(){
    gulp.src(distConfig.cleanFile, { read: false })
    .pipe( rm({ async: false }) )
});
