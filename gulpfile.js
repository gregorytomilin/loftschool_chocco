const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
// импорт файлов в SCSS по расширению, вместо поштучного импорта
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// Перевод пикселей в rem
const px2rem = require('gulp-smile-px2rem');
// Группировка повторяющихся @media queries не корректно срабатывает
const gcmq = require('gulp-group-css-media-queries');
// Минификация итогового CSS
const cleanCSS = require('gulp-clean-css');
// Компиляция карты кода sourceMap
const sourcemaps = require('gulp-sourcemaps');
// Контроль условий
const gulpif = require('gulp-if');
// сохраним значение переменной среды NODE_ENV в переменную env (доступ к переменным среды предоставляет объект process.env):
const env = process.env.NODE_ENV;

const reload = browserSync.reload;


sass.compiler = require('node-sass');

task('clean', () => {
    console.log(env); return src("dist/**/*", { read: false })
        .pipe(rm())
});

task('copy:html', () => {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(reload({ stream: true }));
});

task('styles', () => {
    return src('src/styles/main.scss')
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        // .pipe(px2rem()) работает некорректно
        .pipe(
            gulpif(env === 'prod', autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
            cascade: false
          }))
//   Replace Autoprefixer browsers option to Browserslist config.
//   Use browserslist key in package.json or .browserslistrc file.

//   Using browsers option can cause errors. Browserslist config
//   can be used for Babel, Autoprefixer, postcss-normalize and other tools.

//   If you really need to use option, rename it to overrideBrowserslist.

//   Learn more at:
//   https://github.com/browserslist/browserslist#readme
//   https://twitter.com/browserslist
      )
        // .pipe(gcmq())
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist/css'))
        .pipe(reload({ stream: true }));
});

task('copy:img', () => {
    return src('src/img/**/*')
        .pipe(dest('dist/img'))
        .pipe(reload({ stream: true }));
});

task('copy:js', () => {
    return src('src/js/**/*')
        .pipe(dest('dist/js'))
        .pipe(reload({ stream: true }));
});

task('copy:content', () => {
    return src('src/content/**/*')
        .pipe(dest('dist/content'))
        .pipe(reload({ stream: true }));
});

task('scripts', () => {
    return src('src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(sourcemaps.write())
      .pipe(dest('dist/js'));
   });




task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

task('watch', ()=>{
    watch('./src/styles/**/*.scss', series('styles'));
    watch('./src/js/**/*.js', series('copy:js'));
    watch('./src/*.html', series('copy:html'));
})

task('default', series('clean',
    parallel('copy:html', 'copy:img', 'copy:js', 'copy:content', 'styles'),
    parallel('watch', 'server'))
);

task('build',
    series(
        'clean',
        parallel('copy:html', 'styles', 'copy:img', 'copy:js')
    )
)





