module.exports = function(config) {
  config.set({

    basePath : '../',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js',

      {pattern: 'app/index.html'      , watched: true, included: false, served: false},
      {pattern: 'app/partials/*.html' , watched: true, included: false, served: false},
      {pattern: 'app/data/*.json'     , watched: true, included: false, served: false},
      {pattern: 'app/css/*.css'       , watched: true, included: false, served: false}
    ],

    autoWatch : true,

    frameworks : ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    logLevel : LOG_DEBUG,

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
