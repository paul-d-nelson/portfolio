axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
browserify   = require 'roots-browserify'
css_pipeline = require 'css-pipeline'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    browserify(files: 'assets/js/main.coffee', out: 'js/build.js', minify: true, hash: true),
    css_pipeline(files: 'assets/css/*.styl', out: 'css/build.css', minify: true, hash: true)
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]