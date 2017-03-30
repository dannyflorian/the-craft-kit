//include gulp
var gulp = require('gulp');

//include plug-ins
var stylish = require('jshint-stylish'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	concat = require('gulp-concat');

//js hint task
gulp.task('jshint', function() {
		gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

//js scripts
gulp.task('scripts', function() {
	gulp.src('./src/scripts/*.js')
	.pipe(jshint())
  	.pipe(jshint.reporter(stylish))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./public/scripts'));
});

//vendor scripts
gulp.task('vendor', function() {
	gulp.src(['./src/scripts/vendor/jquery.js', './src/scripts/vendor/selectivizr.js'])
	.pipe(concat({
		path: 'vendor.js'
	}))
	.pipe(gulp.dest('public/scripts/vendor'))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('public/scripts/vendor'));
});

//sass task
gulp.task('sass', function() {
	return sass('./src/sass/')
	.pipe(gulp.dest('./public/css'))
	.pipe(cssmin())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./public/css'));
});

//watch files
gulp.task('watch', function() {
	gulp.watch('./src/sass/*.scss', ['sass']);
	gulp.watch('./src/scripts/*.js', ['scripts']);
	gulp.watch('./src/scripts/*.js', ['vendor']);
});

//default tasks
gulp.task('default', ['scripts', 'sass', 'vendor']);
