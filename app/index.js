'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.cyan('Angular Drupal') + ' generator!'
    ));
    this.log(chalk.cyan('Out of the box I include some libraries and recommended modules'));
    var prompts = [
      {
        type: 'list',
        name: 'styles',
        message: 'Which styles would you like to use?',
        choices: [
          {
            value: 'bootstrap',
            name: 'Twitter Bootstrap',
            default: true
          },
          {
            value: 'foundation',
            name: 'Zurb Foundation',
            default: false
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to use?',
        choices: [
          {
            value: 'animateModule',
            name: 'angular-animate.js',
            checked: true
          }, {
            value: 'ariaModule',
            name: 'angular-aria.js',
            checked: false
          }, {
            value: 'cookiesModule',
            name: 'angular-cookies.js',
            checked: true
          }, {
            value: 'resourceModule',
            name: 'angular-resource.js',
            checked: true
          }, {
            value: 'messagesModule',
            name: 'angular-messages.js',
            checked: false
          }, {
            value: 'uiRouteModule',
            name: 'angular-ui-router.js',
            checked: true
          }, {
            value: 'sanitizeModule',
            name: 'angular-sanitize.js',
            checked: true
          }, {
            value: 'touchModule',
            name: 'angular-t' +
              'ouch.js',
            checked: true
          }
        ]
      },
      {
        type: 'confirm',
        name: 'backendVersion',
        message: 'Your Backend server is Drupal 8 ?',
        default: true
      },
      {
        type: 'string',
        name: 'backendServer',
        message: 'What is your Drupal Backend URL (include protocol)?',
        default: 'http://example.com'
      },
      {
        type: 'string',
        name: 'backendPort',
        message: 'What is your Drupal Backend Port?',
        default: '80'
      },
      {
        type: 'confirm',
        name: 'backendCORS',
        message: 'Enable Cross-origin resource sharing (CORS)?',
        default: true
      },
      {
        when: function (response) {
          return response.backendCORS;
        },
        type: 'string',
        name: 'backendUser',
        message: 'What is your Backend user?',
        default: 'admin'
      },
      {
        when: function (response) {
          return response.backendCORS;
        },
        type: 'password',
        name: 'backendPassword',
        message: 'What is your Backend password?',
      }
    ];

    this.prompt(prompts, function (props) {
      this.appPath = 'app';

      var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
      this.animateModule = hasMod('animateModule');
      this.ariaModule = hasMod('ariaModule');
      this.cookiesModule = hasMod('cookiesModule');
      this.messagesModule = hasMod('messagesModule');
      this.resourceModule = hasMod('resourceModule');
      this.routeModule = hasMod('routeModule');
      this.sanitizeModule = hasMod('sanitizeModule');
      this.touchModule = hasMod('touchModule');


      this.styles = props.styles;
      this.modules = props.modules;
      this.backendVersion = props.backendVersion;
      this.backendServer = props.backendServer;
      this.backendPort = props.backendPort;
      this.backendCORS = props.backendCORS;
      done();
    }.bind(this));

  },

  writing: {
    app: function () {
      this.directory(this.templatePath('app'),this.destinationPath('app'));
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
