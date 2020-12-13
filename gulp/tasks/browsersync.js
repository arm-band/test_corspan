const _         = require('../plugin');
const dir       = require('../dir');
const ejs = require('./ejs');
const jsBuild = require('./js');
const sass = require('./sass');
const jsoncopy = require('./json');
const phpcopy = require('./phpcopy');
const phphtaccess = require('./envfile');

//自動リロード
const browsersync = () => {
    _.connect.server({
        port: process.env.PROXY_PORT,
        base: dir.dist.html,
        bin: process.env.PHP_BIN,
        ini: process.env.PHP_INI
    }, () => {
        _.browserSync.init({
            proxy: `${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`,
            open: 'external',
            https: false
        });
    });

    const sEjs = _.gulp.series(ejs, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.ejs}/**/*.ejs`
    )
        .on('add',    sEjs)
        .on('change', sEjs)
        .on('unlink', sEjs);
    const sJson =  _.gulp.series(jsoncopy, _.browserSync.reload);
    _.gulp.watch(
        `${dir.contents.src}/**/*`
    )
        .on('add',    sJson)
        .on('change', sJson)
        .on('unlink', sJson);
    const sPhp =  _.gulp.series(phpcopy, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.php}/**/*.php`
    )
        .on('add',    sPhp)
        .on('change', sPhp)
        .on('unlink', sPhp);
    const sPhpHtaccess =  _.gulp.series(phphtaccess, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.envfile}/**/*`
    )
        .on('add',    sPhpHtaccess)
        .on('change', sPhpHtaccess)
        .on('unlink', sPhpHtaccess);
    const sSass = _.gulp.series(sass, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.scss}/**/*.scss`,
        {
            ignored: [
                `${dir.src.scss}/util/_var.scss`
            ]
        }
    )
        .on('add',    sSass)
        .on('change', sSass)
        .on('unlink', sSass);
    const sJs = _.gulp.series(jsBuild, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.js}/**/*.js`,
        {
            ignored: [
                `${dir.src.js}/concat/**/*.js`
            ]
        }
    )
        .on('add',    sJs)
        .on('change', sJs)
        .on('unlink', sJs);
};

module.exports = _.gulp.series(browsersync);
