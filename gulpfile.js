// Require Gulp first!
const gulp = require("gulp"),
  rename = require("gulp-rename"),
  terser = require("gulp-terser"),
  uglifycss = require("gulp-uglifycss"),
  browserSync = require("browser-sync").create(),
  eslint = require("gulp-eslint"),
  prettyError = require("gulp-prettyerror");

// Terser Package minify js
gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

//Minify css
gulp.task("css-files", function() {
  return gulp
    .src("./css/*.css") // What files do we want gulp to consume?
    .pipe(uglifycss()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.css" })) // Rename the uglified file
    .pipe(gulp.dest("./build/css")); // Where do we put the result?
});

//Watch for changes
gulp.task("watch", function(done) {
  gulp.watch("js/*.js", gulp.series("lint", "scripts"));
  gulp.watch("css/*.css", gulp.series("css-files"));

  done();
});

// //Gulp Browser Sync Package
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on("change", browserSync.reload);
  done();
});

//Linting
gulp.task("lint", function() {
  return gulp
    .src("js/*.js")
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task("default", gulp.parallel("watch", "browser-sync"));
