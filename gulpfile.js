// Require Gulp first!
const gulp = require("gulp");

//Terser Package
// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename");
gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

//Gulp Browser Sync Package
var browserSync = require("browser-sync").create();

gulp.task("css", function() {
  return gulp
    .src("css/*css")
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest("build/css"));
});

gulp.task("css-watch", ["css"], function(done) {
  browserSync.reload();
  done();
});

gulp.task("browser-sync", ["css"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("css/*.css", ["css-watch"]);
});

gulp.task("default", gulp.parallel("scripts", "browser-sync", "css-watch"));
