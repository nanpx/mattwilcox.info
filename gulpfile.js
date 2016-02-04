var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();

var DIST = 'dst';
var SRC = 'src';

var dist = function(subpath) {
	return !subpath ? DIST : path.join(DIST, subpath);
};

var src = function(subpath) {
	return !subpath ? SRC : path.join(SRC, subpath);
};

var styleTask = function(lessPath, cssPath, srcs) {
	return gulp.src(srcs.map(function(srcFile) {
		return path.join(src(lessPath), srcFile);
	}))
	.pipe($.less())
	.pipe($.cssnano())
	.pipe(gulp.dest(dist(cssPath)))
	.pipe($.size({title: cssPath}));
};

var copyTask = function(subpath, srcs) {
	return gulp.src(srcs.map(function(srcFile) {
		return srcFile.indexOf('!') === 0 ? '!' + path.join(src(subpath), srcFile.substr(1)) : path.join(src(subpath), srcFile);
	}),{
		dot: true
	})
	.pipe(gulp.dest(dist(subpath)))
	.pipe($.size({title: subpath}));
}

var htmlTask = function(subpath, srcs) {
	return gulp.src(srcs.map(function(srcFile) {
		return path.join(src(subpath), srcFile);
	}))
	.pipe($.htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(dist(subpath)))
	.pipe($.size({title: subpath}));
};

gulp.task('styles', function() {
	return styleTask('assets/less', 'assets/css', ['main.less']);
});

gulp.task('copy', function() {
	return copyTask('',[
		'favicon.ico',
		'robots.txt',
		'sitemap.xml',
	])
	.pipe(copyTask('assets',[
		'**/*',
		'!less/**'
	]));
});

gulp.task('html', function() {
	return htmlTask('', ['index.html']);
});

gulp.task('watch', function() {
    gulp.watch(src('assets/less/*.less'), ['styles']);
    gulp.watch(src('**/*.html'), ['html']);
});

gulp.task('build', ['copy','styles','html']);
