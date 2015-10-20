var config = require('./backend/rest-server/config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gulpFile = require('gulp-file');
var babel = require('gulp-babel');
var del = require('del');
var path = require('path');
var fs = require("fs");
var _ = require('lodash');

var EXPRESS_ROOT = __dirname+'/build';
var prefix = 'frontend/main-site';

var files = {
  html: prefix+'/templates/index.html',
  templates: [
    prefix+'/templates/*.html',
    prefix+'/modules/**/*.html',
    prefix+'/directives/**/*.html',
    ],
  js: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/ng-file-upload/ng-file-upload.js',
    'bower_components/angularUtils-pagination/dirPagination.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/bootstrap-sweetalert/lib/sweet-alert.js',
    'bower_components/moment/moment.js',
    'bower_components/bootstrap-daterangepicker/daterangepicker.js',
    'bower_components/lodash/lodash.js',
    prefix+'/*.js',
    prefix+'/resources/*.js',
    prefix+'/modules/**/*.js',
    prefix+'/services/**/*.js',
    prefix+'/directives/**/*.js',
  ],
  img: prefix+'/assets/img/*',
  sass: [
    'bower_components/normalize-css/normalize.css',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'bower_components/bootstrap-social/bootstrap-social.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/bootstrap-sweetalert/lib/sweet-alert.css',
    'bower_components/bootstrap-daterangepicker/daterangepicker.css',
    prefix+'/assets/css/*.scss'],
  fonts: [
    'bower_components/bootstrap/dist/fonts/*',
    'bower_components/font-awesome/fonts/*',
  ]
};
var spawn = require('child_process').spawn;
var buildTask = ['html', 'templates', 'js', 'sass', 'img', 'dicts', 'fonts'];

//buildTask.push(require('./backend/rest-server/gulpfile')());

gulp.task('watch', function() {
	var process;

	function restart() {
		if (process) {
			process.kill();
		}

		process = spawn('gulp', ['watch-child'], {stdio: 'inherit'});
	}

	gulp.watch('gulpfile.js', restart);
	restart();
});

function startExpress() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(41234);
}
var lr;
function startLivereload() {
  lr = require('tiny-lr')();
  lr.listen(35729);
}

gulp.task('html', function() {
  return gulp.src(files.html)
    .pipe(gulp.dest('build'));
});

gulp.task('templates', function() {
  return gulp.src(files.templates)
    .pipe(rename(function (path) { path.dirname = ''; }))
    .pipe(gulp.dest('build/templates'));
});

gulp.task('js', function() {
  var tmp = gulp.src(files.js)
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    //.pipe(babel())
    .pipe(concat('app.js'));

  if (!config.develop) {
    return tmp//.pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('build'))
  } else {
    return tmp.pipe(gulp.dest('build'));
  }
    //.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('sass', function() {
  var tmp = gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('app.css'));

  if (!config.develop) {
    return tmp//.pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('build'))
  } else {
    return tmp.pipe(gulp.dest('build'));
  }
    //.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('img', function() {
  return gulp.src(files.img)
    //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/img'))
    //.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('fonts', function() {
  return gulp.src(files.fonts)
    .pipe(gulp.dest('build/fonts'))
    //.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('dicts', function prepareDicts() {
  var dir = './backend/rest-server/app/dicts';
  var files = _.filter(fs.readdirSync(dir), function (item) {
    return item.indexOf('.') < 0;
  });
  //console.log('Use dicts:', files);
  var result = 'window.dicts = {};';
  var dicts = _.map(files, function (item) {
    try {
      var dict = require('./'+path.join(dir, item));;
      if (dict.list)
        result += "window.dicts['" + item + "'] = " + JSON.stringify(dict.list()) + ';';
    } catch (e) {
      console.log(e);
    }
  });
  return gulpFile('dicts.js', result, { src: true })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(cb) {
  del(['build/fonts', 'build/img', 'build/'], cb)
});

gulp.task('default', function() {
  gulp.start('watch');
});

gulp.task('build', function() {
  gulp.start(buildTask);
});

// Watch
gulp.task('watch-child', function() {
  gulp.start('build');
  startExpress();
  startLivereload();

  gulp.watch(files.html, ['html']);
  gulp.watch(files.templates, ['templates']);
  gulp.watch(files.sass, ['sass']);
  gulp.watch(files.js, ['js']);
  gulp.watch(files.img, ['images']);
  gulp.watch(files.fonts, ['fonts']);
  gulp.watch(['build/**']).on('change', function notifyLivereload(event) {
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    lr.changed({body: {files: [fileName]}});
  });
});
