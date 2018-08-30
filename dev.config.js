'use strict';
var config = require('./config');

module.exports = {
	//服务器端口
	'pagePort':config.port,
	//单页面在浏览器中的连接
	'pageLink':'http://localhost:' + config.port + '/dev/' + config.fileName + '.html',
	//es6转es5的起始位置
	'esTransBegin':'src/es6/**/*.js',
	'esTransEnd':'src/es5',
	//将js打包的起始位置
	'packBegin':'src/es5/' + config.fileName + '.js',
	'packEnd':'dev/js',
	//打包后js的文件名字和后缀名字
	'renameBasename':'' + config.fileName + '',
	'renameSuffix':'',
	//监测的文件路径
	'watchEs6Src':'src/es6/**/*.js',
	'watchLessSrc':'src/less/**/*.less',
	'watchpugSrc':'src/pug/**/*.pug',
	'devSrc':['dev/js/**/*.js','dev/css/*.css','dev/*.html'],
	//pug转html的起始位置
	'pugSrc':'src/pug/' + config.fileName + '.pug',
	'htmlSrc':'dev/',
	//less转css的起始位置
	'lessSrc':'src/less/' + config.fileName + '.less',
	'cssSrc':'dev/css/',
	//需要重命名的文件路径
	'initRename':['src/es6/demo.js','src/less/demo.less','src/pug/demo.pug'],
	//任务‘replace’需要的参数
	'initReplaceOption':{
		files:[
			'src/pug/demo.pug',
			'src/pug/js/js.pug',
			'src/pug/css/css.pug'
		],
		from:'demo',
		to:config.fileName
	},
	//单页应用的主文件名
	'fileName':config.fileName
}
