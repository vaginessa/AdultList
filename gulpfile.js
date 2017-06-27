var gulp = require('gulp'),
	// concat css files
	concatCss = require('gulp-concat-css'),
	// concat js files
	concat = require('gulp-concat'),
	// add vendor prefixe to css style
	autoprefixer = require('gulp-autoprefixer'),
	// delete duplicate styles
	uncss = require('gulp-uncss'),
	// compress css files
	cssmin = require('gulp-cssmin'),
	// styl => css
	stylus = require('gulp-stylus'),
	// watch for changing in the project
	watch = require('gulp-watch'),
	// rename files
	rename = require('gulp-rename'),
	// image compress
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	// compress js files
	uglify = require('gulp-uglify'),
	// minify html files
	htmlmin = require('gulp-htmlmin'),
	// svg min
	svgmin = require('gulp-svgmin');



// ========= ========= T A S K S ========= =========

//Compile Stylus files to min.css + vendor + uncss
gulp.task('styl', function() {
	return gulp.src('./dist/styl/main.styl')
		.pipe(stylus({
			linenos: false
		}))
			.on('error', function(err) {
				console.log(err.message);
				this.end();
			})
		.pipe(concatCss('style.css'))
		.pipe(autoprefixer([
			'Android 2.3',
			'Android >= 4',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		]))
		.pipe(cssmin())
		.pipe(rename({
		suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/css/'));
});



// Concat + compress + rename css LIBS files
gulp.task('cssLibs', function () {
	return gulp.src('./dist/css/libs/*.css')
		.pipe(concatCss('libs.css'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/css/'));
})

// Concat + compress +rename js files
gulp.task('jsLibs', function () {
    return gulp.src('./dist/js/libs/*.js')
    	.pipe(concat('libs.js'))
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('./dist/js/'));
});

// Common js file
gulp.task('jsCommon', function () {
	return gulp.src('./dist/js/common.js')
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js'));
});

// Concat all libs css files and libs js files
gulp.task('buildLibs', ['cssLibs', 'jsLibs']);



// Watch task
gulp.task('watch', function() {
	gulp.watch("./dist/styl/**/*.styl", ['styl']);
	gulp.watch("./dist/js/common.js", ['jsCommon']);
	gulp.watch('./dist/css/libs/*.css', ['cssLibs']);
});

// ========= ========= ========= ========= ========= 

// ========= ========= B U I L D   O F   T H E   P R O J E C T  ========= =========

// Moves html file from DIST folder to APP folder
gulp.task('htmlBuild', function () {
	return gulp.src('./dist/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./app/'));
});

// Moves main css file from DIST/CSS folder to APP/CSS folder
gulp.task('cssBuild', function () {
	return gulp.src('./dist/css/**/*.min.css')
		.pipe(gulp.dest('./app/css/'));
});

// Moves js files from DIST/JS folder to APP/JS folder
gulp.task('jsBuild', function () {
	return gulp.src('./dist/js/**/*.min.js')
		.pipe(gulp.dest('./app/js/'));
});

// Moves + minificate images from DIST/IMG folder to APP/IMG
gulp.task('imageBuild', function () {
	return gulp.src('./dist/img/**/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('./app/img/'));
});

gulp.task('svgMinify', function () {
    return gulp.src('./dist/img/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./app/img/'));
});

// Start of building
gulp.task('build', ['htmlBuild', 'cssBuild', 'jsBuild', 'imageBuild', 'svgMinify']);
// ========= ========= ========= ========= ========= 