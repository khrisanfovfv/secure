const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
var XLSX = require("xlsx");

//const XLSX = require('xlsx-style');

const destFolder = 'C:/OSPanel/domains/secure/wp-content/themes/cit_secure/';
const pluginFolder = 'C:/OSPanel/domains/secure/wp-content/plugins/';

function images(){
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    .pipe(src('app/images/src/*.*'))
    .pipe(imagemin())
    .pipe(dest(destFolder +'images/'))


}

function php(){
    return src([
       'app/*.php' 
    ])
    .pipe(dest(destFolder))
}

function references_php(){
    var references = ['document_kind','document','department' ,'administrator', 'information_system', 
        'organization', 'contract', 'login', 'employee', 'help' , 'about', 'settings'];
    references.forEach(reference => {
        return src([
            'app/inc/'+ reference + '/*.php'
        ])
        .pipe(dest(destFolder + 'inc/'+ reference + '/'))
    })
}

function secure_database(){
    return src([
        'app/plugins/secure_database/*.php'
    ])
    .pipe(dest(pluginFolder+ 'secure_database/'))
}

function json(){
    return src(['app/resources.json'])
    .pipe(dest(destFolder))
}

function jquery_style(){
    return src(['app/plugins/jquery-ui-1.13.2/jquery-ui.css'])
    .pipe(dest(destFolder + 'css/'));
}



function scripts(){
    return src([
        'app/plugins/jquery-ui-1.13.2/external/jquery/jquery.js',
        'app/plugins/jquery-ui-1.13.2/jquery-ui.js',
        'node_modules/@babel/polyfill/dist/polyfill.js',
        'node_modules/exceljs/dist/exceljs.js',
        'app/plugins/tables_context_menu/context_menu.js',
        'app/js/reference.js',
        'app/inc/login/login.js',
        'app/inc/information_system/information_system.js',
        'app/inc/document_kind/document_kind.js',
        'app/inc/administrator/administrator.js',
        'app/inc/organization/organization.js',
        'app/inc/department/department.js',
        'app/inc/contract/contract.js',
        'app/inc/employee/employee.js',
        'app/inc/document/document.js',
        'app/inc/settings/settings.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    //.pipe(uglify())
    .pipe(dest(destFolder + 'js/'))
    .pipe(browserSync.stream())
}

// function scripts_administrator(){
//     return src('app/inc/administrator/administrator.js')
//     .pipe(dest(destFolder + 'js/'))
//     .pipe(browserSync.stream())
// }

function styles(){
    return src(['app/scss/style.scss'])
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
    .pipe(concat('style.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest(destFolder + '/css'))
    .pipe(browserSync.stream()) 
}

// function styles_administrator(){
//     return src(['app/inc/administrator/administrator.scss'])
//     .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
//     .pipe(concat('administrator_style.css'))
//     /*.pipe(scss({outputStyle: 'compressed'}))*/
//     .pipe(dest(destFolder + '/css'))
//     .pipe(browserSync.stream()) 
// }


function watching(){
    watch(['app/scss/*.scss','app/plugins/**/*.scss'], styles)
    watch(['app/plugins/tables_context_menu/context_menu.js','app/js/main.js'], scripts)
    watch(['app/scss/*.scss', 'app/inc/**/*.scss'], styles)
    watch(['app/plugins/tables_context_menu/context_menu.js',
        'app/js/main.js','app/js/reference.js','app/inc/**/*.js'], scripts)
    watch('app/plugins/secure_database/*.php',secure_database),
    watch('app/inc/document_kind/*.php', references_php),
    watch('app/inc/department/*.php', references_php),
    watch('app/inc/information_system/*.php', references_php),
    watch('app/inc/administrator/*.php', references_php),
    watch('app/inc/organization/*.php', references_php),
    watch(['app/**/*.php'], php).on('change', browserSync.reload)
}

function browsersync(){
    browserSync.init({
        proxy: {
            target: 'http://secure',
            ws: true
          },
          reloadDelay: 2000
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
exports.images = images;
exports.php = php;
exports.secure_database = secure_database;
exports.references_php = references_php;
exports.json = json;
exports.jquery_style = jquery_style;
exports.XLSX = XLSX;

exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, building);

//exports.default = parallel(styles, scripts, browsersync, watching);
exports.default = parallel(json, images, php, references_php, secure_database, styles, jquery_style, scripts, browsersync, watching);