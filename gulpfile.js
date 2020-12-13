/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */
/* require
*************************************** */
const _         = require('./gulp/plugin');
const browsersync = require('./gulp/tasks/browsersync');
const ejs = require('./gulp/tasks/ejs');
const js = require('./gulp/tasks/js');
const sass = require('./gulp/tasks/sass');
const jsoncopy = require('./gulp/tasks/json');
const phpcopy = require('./gulp/tasks/phpcopy');
const phphtaccess = require('./gulp/tasks/envfile');

//Scss
exports.sass = sass;
//ejs
exports.ejs = ejs;
//js
exports.js = js;
//json
exports.jsoncopy = jsoncopy;
//php
exports.phpcopy = phpcopy;
//htaccess for php
exports.phphtaccess = phphtaccess;

//ビルド
const taskBuild = _.gulp.parallel(sass, ejs, js, jsoncopy, phpcopy, phphtaccess);

//ビルドなし
const taskServer = browsersync;
exports.server = taskServer;

//gulpのデフォルトタスクで諸々を動かす
exports.default = _.gulp.series(taskBuild, taskServer);
