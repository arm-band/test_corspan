const _         = require('../plugin');
const dir       = require('../dir');

//htaccess for php
const phphtaccess = () => {
    return _.gulp.src(
        `${dir.src.envfile}/**/*`
    )
    .pipe(_.plumber({
        errorHandler: _.notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'php htaccess'
        })
    }))
    .pipe(_.rename({
        basename: ''
    }))
    .pipe(_.gulp.dest(dir.dist.php));
};

module.exports = phphtaccess;
