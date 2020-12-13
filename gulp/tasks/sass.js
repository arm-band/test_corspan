const _         = require('../plugin');
const dir       = require('../dir');
_.sass.compiler = require('sass');
const Fiber = require('fibers');

//scssコンパイルタスク
const scss = () => {
    const DEV_MODE = process.env.DEV_MODE;
    return _.gulp.src(
        `${dir.src.scss}/**/*.scss`,
        {
            sourcemaps: DEV_MODE === 'true' ? true : false
        }
    )
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'scss'
            })
        }))
        .pipe(_.sass({
            fiber: Fiber,
            outputStyle: 'compressed'
        }).on('error', _.sass.logError))
        .pipe(_.autoprefixer({
            cascade: false
        }))
        .pipe(_.gulp.dest(
            dir.dist.css,
            {
                sourcemaps: DEV_MODE === 'true' ? true : false
            }
        ));
};

module.exports = _.gulp.series(scss);
