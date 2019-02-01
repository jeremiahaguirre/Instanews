// Require Gulp first!
const gulp = require("gulp"),
  rename = require("gulp-rename"),
  terser = require("gulp-terser"),
  uglifycss = require("gulp-uglifycss"),
  browserSync = require("browser-sync").create(),
  eslint = require("gulp-eslint"),
  prettyError = require("gulp-prettyerror"),
  autoPrefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass");



// Terser Package minify js
gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

//Task to minify and complie sass
gulp.task("sass", function() {
  return gulp
    .src("./scss/*.scss") // What files do we want gulp to consume?
    .pipe(prettyError()) //Error output
    .pipe(sass()) //Compile Sass
    .pipe(
      autoPrefixer({
        browsers: ["last 2 versions"]
      })
    ) //Using autoprefixer 'how many browsers to support'
    .pipe(gulp.dest("./build/css")) //To see plain css
    .pipe(uglifycss()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.css" })) // Rename the uglified file
    .pipe(gulp.dest("./build/scss")); // Where do we put the result?
});

//Watch for changes
gulp.task("watch", function(done) {
  gulp.watch("js/*.js", gulp.series("lint", "scripts"));
  gulp.watch("scss/*.scss", gulp.series("sass"));

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
