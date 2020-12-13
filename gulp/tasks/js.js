const _         = require('../plugin');
const dir       = require('../dir');

//js圧縮&結合&リネーム
const jsBuild = () => {
    const DEV_MODE = process.env.DEV_MODE;
    return _.gulp.src(
        `${dir.src.js}/**/*.js`,
        {
            ignore: [
                `${dir.src.js}/concat/**/*.js`
            ],
            sourcemaps: DEV_MODE === 'true' ? true : false
        }
    )
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'js'
            })
        }))
        .pipe(_.concat('app.js'))
        .pipe(_.gulp.dest(`${dir.src.js}/concat/`))
        .pipe(_.uglify({
            output: {
                comments: 'some'
            }
        }))
        .pipe(_.rename((path) => {
            path.basename += '.min'
            path.extname = '.js'
        }))
        .pipe(_.gulp.dest(
            dir.dist.js,
            {
                sourcemaps: DEV_MODE === 'true' ? true : false
            }
        ));
};

module.exports = _.gulp.series(jsBuild);
