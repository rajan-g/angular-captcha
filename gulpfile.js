/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp 	= require('gulp');
var uglify  = require('gulp-uglify');
var del 	= require('del');
var concat	= require('gulp-concat');
var notify  = require('gulp-notify');
var minifyCss = require('gulp-minify-css');


gulp.task('clean:dest', function () {
    return del([
        'dist/*',
    ]);
});

gulp.task('minify-js', function () {
    gulp.src([
        'angular-captcha.js',
    ])       
	.pipe(uglify({mangle: false}))
	.pipe(concat('angular-captcha-min.js'))
	.on("error", notify.onError(function (error) {
		return "Error: " + error.message;
        }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('minify-css', function() {
  return gulp.src('style/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['clean:dest', 'minify-js', 'minify-css']);