const _         = require('../plugin');
const dir       = require('../dir');

//json copy
const json = () => {
    return _.gulp.src(
        `${dir.contents.src}/**/*`
    )
    .pipe(_.plumber({
        errorHandler: _.notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'jsoncopy'
        })
    }))
    .pipe(_.gulp.dest(dir.contents.dist));
};

module.exports = json;
