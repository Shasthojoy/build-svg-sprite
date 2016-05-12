// ==========================================================================
// Gulp build script
// ==========================================================================
/*global require, __dirname*/
/*jshint -W079 */
"use strict";

var path        = require("path"),
    gulp        = require("gulp"),
    run         = require("run-sequence"),
    svgstore    = require("gulp-svgstore"),
    svgmin      = require("gulp-svgmin");

var root = __dirname,
paths = {
    src:     path.join(root, "sprite/*.svg"),
    output:  path.join(root, "dist/")
},
build = {
    sprite: function() {
        // Process Icons
        gulp.task("sprite", function () {
            return gulp
                .src(paths.src)
                .pipe(svgmin({
                    plugins: [{
                        removeDesc: true
                    }]
                }))
                .pipe(svgstore())
                .pipe(gulp.dest(paths.output));
        });
    }
};

// Plyr core files
build.sprite();

// Default gulp task
gulp.task("default", function(){
    run("sprite", "watch");
});

// Watch for file changes
gulp.task("watch", function () {
    gulp.watch(paths.src, ["sprite"]);
});