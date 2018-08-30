# niuspa

A scaffold that is used to js library in an efficient way.

# How to use

## basic usage

1.run `npm install` in CLI to install dependencies that the scaffold needs.

2.specify you own file name and port in the config.js,unless you want to use the default file name called 'demo'.

3.run `gulp init` in ClI if you do the second step.

4.run `gulp` in CLI to develop!

5.run `gulp build` in CLI to produce the code that used to deploy.

## more infomation

1.gulpfile.js is divided into some parts ,and you can write a new part depend on your particular need.Benefit is to avoid a large gulpfile.js.

2.developer write the code in src folder.the code in the dev folder is runing in browser when you developing.the code in dist is used to deploy.

3.the third parts js files and images should be put in the dev folder

# feature

1.support es6.the js code will be packed.

2.support less.you can use less to write css.

3.support pug.to use pug.

4.the browser will be refreshed automatically when you modify you code.

5.provide a server environment for single page application.
