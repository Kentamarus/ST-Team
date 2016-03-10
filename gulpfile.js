var gulp = require('gulp'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    prefixer = require('gulp-autoprefixer'),   
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),   
    cssmin = require('gulp-minify-css'),
    browserSync = require("browser-sync"),   
    gutil = require('gulp-util'),
    concatCss = require('gulp-concat-css');
    reload = browserSync.reload,
    gulpSequence = require('gulp-sequence');

var concatConfig = {
    file: 'bundle.css'
}

var path = {
    production: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: '.production/',
        js: '.production/scripts/',
        css: '.production/css/',
        img: '.production/images/',
        uploads: '.production/uploads/',
        style: '.production/style/',
        libs: '.production/libraries/',
        fonts: '.production/fonts/'        
    },
    create: { //Пути откуда брать исходники
        html: 'app/*.html',
        js: 'app/scripts/scripts.js',//В стилях и скриптах нам понадобятся только main файлы        
        css: 'app/css/**/*.css',
        style: 'app/style/**/*.css',
        libs: 'app/libraries/**/*.*',
        img: 'app/images/**/*.*',      
        uploads: 'app/uploads/**/*.*',      
        fonts: 'app/fonts/**/*.*',
        tmp: 'app/tmp/**/*.css'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        css: 'app/css/**/*.css',
        style: 'app/style/**/*.css',
        img: 'app/images/**/*.*',
        uploads: 'app/uploads/**/*.*',      
        libs: 'app/libraries/**/*.*',
        fonts: 'app/fonts/**/*.*'      
    },
    clean: './.production'
};

var config = {
    server: {
        baseDir: "./.production"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

// html
gulp.task('html:build', function () {
    gulp.src(path.create.html) //Выберем файлы по нужному пути       
        .pipe(gulp.dest(path.production.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});


gulp.task('js:build', function () {
    gulp.src(path.create.js) //Найдем наш main файл        
        .pipe(uglify().on('error', gutil.log))        
        .pipe(gulp.dest(path.production.js)) //Выплюнем готовый файл в production 
        .pipe(reload({stream: true}));     
});

gulp.task('image:build', function () {
    gulp.src(path.create.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.production.img)) //И бросим в production       
});

gulp.task('css-concat', function () {  
    return gulp.src(path.create.css)
        .pipe(concatCss(concatConfig.file))        
        .pipe(gulp.dest('app/tmp'))
});

gulp.task('css-build', function () {
  return gulp.src(path.create.tmp)    
        //.pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем        
        .pipe(gulp.dest('app/style'))
        .pipe(gulp.dest(path.production.style))
        .pipe(reload({stream: true}));  
});

gulp.task('uploads:build', function () {
    gulp.src(path.create.uploads) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.production.uploads)) //И бросим в production       
});

gulp.task('libs:build', function () {
    gulp.src(path.create.libs) //Выберем наши библиотеки        
        .pipe(gulp.dest(path.production.libs)) //И бросим в production 
});

gulp.task('fonts:build', function () {
    gulp.src(path.create.fonts) //Выберем наши шрифты        
        .pipe(gulp.dest(path.production.fonts)) //И бросим в production 
});

gulp.task('build', [
    'html:build',     
    'image:build',
    'uploads:build',
    'js:build',
    'fonts:build'
]);

gulp.task('css:build',function(){
    gulpSequence('css-concat','css-buld');
})

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('watch', function(){  
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });   
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.uploads], function(event, cb) {
        gulp.start('uploads:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });   
});

gulp.task('default', ['build', 'webserver', 'watch', 'libs:build', 'css:build' ]);
    
console.log("Gulpfile is updated");