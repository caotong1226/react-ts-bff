const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("build:ts", () =>
  gulp.src("./src/nodeuii/**/*.ts").pipe(babel()).pipe(gulp.dest("./dist/"))
);

gulp.task("default", gulp.series("build:ts"));

if (process.env.NODE_ENV !== "production") { 
  gulp.watch("./src/nodeuii/**/*.ts", gulp.series("default"));
}
