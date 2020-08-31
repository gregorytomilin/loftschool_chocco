const { src, dest, task, series, watch } = require("gulp");
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

const reload = browserSync.reload;


sass.compiler = require('node-sass');

task('clean', () => { return src("dist/**/*", { read: false }).pipe(rm()) });

task('copy:html', () => {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(reload({ stream: true }));
});

task('styles', () => {
    return src('src/styles/main.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        // .pipe(px2rem()) работает некорректно
        .pipe(autoprefixer({
//   Replace Autoprefixer browsers option to Browserslist config.
//   Use browserslist key in package.json or .browserslistrc file.

//   Using browsers option can cause errors. Browserslist config
//   can be used for Babel, Autoprefixer, postcss-normalize and other tools.

//   If you really need to use option, rename it to overrideBrowserslist.

//   Learn more at:
//   https://github.com/browserslist/browserslist#readme
//   https://twitter.com/browserslist
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
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

watch('./src/styles/**/*.scss', series('styles'));
watch('./src/js/**/*.js', series('copy:js'));
watch('./src/*.html', series('copy:html'));

task('prod', series('clean', 'copy:html', 'copy:img', 'copy:js', 'copy:content', 'styles', 'server'));




