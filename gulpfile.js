const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

function scripts(){
    return src([
        /*'node_modules/jquery/dist/jquery.js',*/
        'app/plugins/jquery-ui-1.13.2/external/jquery/jquery.js',
        /*'app/plugins/jquery-ui-1.13.2/jquery-ui.js',*/
        'app/plugins/tables_context_menu/context_menu.js',
        'app/inc/document_kind/document_kind.js',
        'app/inc/administrator/administrator.js',
        'app/inc/organisation/organisation.js',
        'app/inc/department/department.js',
        'app/inc/contract/contract.js',
        'app/inc/employeer/employeer.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function styles(){
    return src(['app/scss/style.scss'])
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
    .pipe(concat('style.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream()) 
}

function watching(){
    watch(['app/scss/*.scss',
           'app/inc/**/*.scss'], styles)
    watch(['app/plugins/tables_context_menu/context_menu.js',
           'app/js/main.js','app/inc/**/*.js'], scripts)
    watch(['app/**/*.html']).on('change', browserSync.reload)
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return src('dist')
    .pipe(clean())
}

function building(){
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*html'
    ], {base : 'app'})
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;

exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, building);

exports.default = parallel(styles, scripts, browsersync, watching);