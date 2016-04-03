var webpack = require('webpack');
var webpackConfig = require('configWebpack/prod.js');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    singleRun: true, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      // all files ending in "_test"
      'test/*_test.js',
      'test/**/*_test.js'
      // each file acts as entry point for the webpack configuration
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      // add webpack as preprocessor
      'test/*_test.js': ['webpack', 'sourcemap'],
      'test/**/*_test.js': ['webpack', 'sourcemap']
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};