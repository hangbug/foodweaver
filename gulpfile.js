/**
 * Created by HANG on 10/11/2016.
 */
const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
const gutil=require('gulp-util');
var source = require("vinyl-source-stream");
var babelify = require("babelify");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const babel = require("gulp-babel");
var browserify = require('browserify')

const cssFiles = "./app/styles/css/*.css";
const sassFiles = "./app/styles/sass/*.scss";

const bundleFile = "./public/js/*.js";
gulp.task("sass", () => {
    gulp
        .src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles-from-sass.min.css"))
        .pipe(autoPrefix())
        //.pipe(cleanCSS())
        .pipe(gulp.dest("./public/style"));
});

gulp.task("css", () => {
    gulp
        .src(cssFiles)
        .pipe(concatenate("styles.min.css"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./public/style"));
});


gulp.task('browserify', ()=> {
     browserify('./app/app.js')
    .transform(babelify,{presets:["es2015", "react"]})
    .bundle().on('error',(e)=>{gutil.log(e)})
    .pipe(source('components.js'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task("bundle", () => {
    return gulp
        .src(bundleFile)
        .pipe(concatenate("bundle.js"))
        //.pipe(buffer())
        //.pipe(uglify()).on('error', gutil.log)
        .pipe(gulp.dest("./public/"));
});
gulp.task("bundleStyle", () => {
    return gulp
        .src('./public/style/*.css')
        .pipe(concatenate("css.min.css"))
        .pipe(gulp.dest("./public/"));
});

gulp.task("watch", () => {
    //gulp.watch(cssFiles, ["css","bundleStyle"]);
    gulp.watch(sassFiles, ["sass","bundleStyle"]);
    //gulp.watch(jsFiles, ["browserify","bundle"]);
});

gulp.task("default", ["sass", "bundleStyle"]);