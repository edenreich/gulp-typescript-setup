const gulp 			= require('gulp');
const browserSync	= require('browser-sync');
const browserify 	= require('browserify');
const source 		= require('vinyl-source-stream');
const buffer 		= require('vinyl-buffer');
const tsify	 		= require('tsify');
const uglify	 	= require('gulp-uglify');
const sourcemaps 	= require('gulp-sourcemaps');

const src = 'src';
const outdir = 'dist';

gulp.task('copy-html', function()
{
	return gulp.src(src+'/index.html')
	.pipe(gulp.dest('./'+outdir))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function()
{
	browserSync.init({
		server: {
			baseDir: './'+outdir
		}
	});
});

gulp.task('reload', function()
{
	browserSync.reload(['*.html', '*.js']);
});

gulp.task('watch', function()
{
	gulp.watch(src+'/index.html', [ 'copy-html' ]);
	gulp.watch(src+'/**/*.ts', [ 'build-typescript', 'reload' ]);
});

gulp.task('watch-pull', ['copy-html', 'build-typescript-dev', 'serve', 'watch']);

gulp.task('build-typescript-dev', function()
{
	browserify('./'+src+'/App.ts')
		.plugin(tsify)
		.bundle()
		.pipe(source('App.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'+outdir));
});

gulp.task('build-typescript-prod', function()
{
	browserify('./'+src+'/App.ts')
		.plugin(tsify)
		.bundle()
		.pipe(source('App.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./'+outdir));
});

gulp.task('default', ['watch-pull']);