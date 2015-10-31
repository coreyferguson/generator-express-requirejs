var generators = require('yeoman-generator');
var fs = require('fs');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });
  },

  prompting: function() {
    var that = this;
    var done = this.async();
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname,
        validate: function(name) {
          // validate project file/folder name doesn't already exist
          if (name === undefined || name === null || name === '') {
            return false;
          } else {
            var destinationPath = that.destinationPath(name);
            try {
              fs.statSync(destinationPath);
            }
            catch (error) {
              if (error.code === 'ENOENT') {
                return true;
              } else {
                throw error;
              }
            }
            return 'A file/folder with this name already exists.';
          }
        }
      },
      {
        type: 'confirm',
        name: 'isGitAvailable',
        message: 'Configure Git',
        default: true
      },
      {
        type: 'confirm',
        name: 'isGruntAvailable',
        message: 'Configure Grunt',
        default: true
      },
      {
        type: 'confirm',
        name: 'isGruntBumpAvailable',
        message: 'Configure grunt-bump',
        default: true,
        when: function(answers) {
          return answers.isGruntAvailable && answers.isGitAvailable;
        }
      },
      {
        type: 'confirm',
        name: 'isJsHintAvailable',
        message: 'Configure JSHint',
        default: true,
        when: function(answers) {
          return answers.isGruntAvailable;
        }
      },
      {
        type: 'confirm',
        name: 'isMochaAvailable',
        message: 'Configure unit testing with Karma, Mocha and Chai',
        default: true
      }
    ], function (answers) {
      this.project = {
        name: this.appname
      };
      this.environment = {
        isGitAvailable: answers.isGitAvailable,
        isGruntAvailable: answers.isGruntAvailable,
        isGruntBumpAvailable: (answers.isGruntAvailable ? answers.isGruntBumpAvailable : false),
        isJsHintAvailable: answers.isJsHintAvailable,
        isMochaAvailable: answers.isMochaAvailable
      };
      done();
    }.bind(this));
  },

  configuring: function () {
    // create project in new folder with chosen appname
    this.destinationRoot(this.appname);
    // save model object for use in templates
    this.config.set('templateModel', {
      project: this.project,
      environment: this.environment
    });
  },

  writing: {
    templates: function() {
      var model = this.config.get('templateModel');
      this.fs.copyTpl(
        this.templatePath('writing/**/*'),
        this.destinationPath(),
        model);
      this.fs.copyTpl(
        this.templatePath('writing/**/.*'),
        this.destinationPath());
    },
    git: function() {
      if (this.environment.isGitAvailable) {
        this.fs.copyTpl(
          this.templatePath('git/**/*'),
          this.destinationPath());
        // rename destionation gitignore files to .gitignore
        // https://github.com/npm/npm/issues/1862
        this.fs.move(
          this.destinationPath('gitignore'), 
          this.destinationPath('.gitignore'));
      }
    },
    mocha: function() {
      if (this.environment.isMochaAvailable) {
        this.fs.copyTpl(
          this.templatePath('mocha/**/*'),
          this.destinationPath());
      }
    }
  },

  install: {
    npm: function() {
      this.npmInstall(['express'], { 'saveDev': true });
    },
    bowerRequireJs: function() {
      this.npmInstall(['bower-requirejs'], { 'saveDev': true });
    },
    bower: function() {
      this.bowerInstall('requirejs', {'saveDev': true});
    },
    grunt: function() {
      // grunt
      if (this.environment.isGruntAvailable) {
        var defaultGruntTasks = [];
        var testGruntTasks = [];
        this.npmInstall('grunt', { 'saveDev': true });
        this.gruntfile.insertConfig('pkg', 'grunt.file.readJSON("package.json")');

        // grunt-bump
        if (this.environment.isGruntBumpAvailable) {
          this.npmInstall('grunt-bump', { 'saveDev': true });
          this.gruntfile.insertConfig('bump', "{ options: { push: false } }");
          this.gruntfile.loadNpmTasks('grunt-bump');
        }

        // jshint
        if (this.environment.isJsHintAvailable) {
          this.npmInstall('grunt-contrib-jshint', { 'saveDev': true });
          this.gruntfile.insertConfig('jshint', "{ 'grunt': 'Gruntfile.js', 'app': 'src/client/js/**/*.js' }");
          this.gruntfile.loadNpmTasks('grunt-contrib-jshint');
          testGruntTasks.push('jshint');
        }

        // mocha
        if (this.environment.isMochaAvailable) {
          // TODO: non-grunt-dependencies outside of "grunt" task
          this.npmInstall('grunt-karma', { 'saveDev': true });
          this.npmInstall('grunt-mocha-test', { 'saveDev': true });
          this.gruntfile.insertConfig('mochaTest', "{ test: { src: ['test/server/**/*.js'] } }");
          this.gruntfile.insertConfig('karma', "{ continuous: { configFile: 'test/client/karma.conf.js' }, single: { configFile: 'test/client/karma.conf.js', singleRun: true, browsers: ['PhantomJS'] } }");
          this.gruntfile.loadNpmTasks('grunt-mocha-test');
          this.gruntfile.loadNpmTasks('grunt-karma');
          testGruntTasks.push('mochaTest');
          testGruntTasks.push('karma:single');
        }

        // register default task
        if (testGruntTasks.length > 0) {
          this.gruntfile.registerTask('test', testGruntTasks);
          defaultGruntTasks.push('test');
        }
        if (defaultGruntTasks.length > 0) {
          this.gruntfile.registerTask('default', defaultGruntTasks);
        }
      }
    },
    mocha: function() {
      if (this.environment.isMochaAvailable) {
        this.npmInstall('chai', { 'saveDev': true });
        this.npmInstall('karma', { 'saveDev': true });
        this.npmInstall('karma-chai', { 'saveDev': true });
        this.npmInstall('karma-chrome-launcher', { 'saveDev': true });
        this.npmInstall('karma-mocha', { 'saveDev': true });
        this.npmInstall('karma-phantomjs-launcher', { 'saveDev': true });
        this.npmInstall('karma-requirejs', { 'saveDev': true });
        this.npmInstall('mocha', { 'saveDev': true });
        this.npmInstall('phantomjs', { 'saveDev': true });
        this.npmInstall('requirejs', { 'saveDev': true });
      }
    }
  },

  end: {
    bowerrcc: function() {
      var model = this.config.get('templateModel');
      this.fs.copyTpl(
        this.templatePath('end/**/*'),
        this.destinationPath(),
        model);
      this.fs.copyTpl(
        this.templatePath('end/**/.*'),
        this.destinationPath());
    },
    git: function() {
      if (this.environment.isGitAvailable) {
        // initiate local git repo
        var done = this.async();
        var spawnOptions = { stdio: ['ignore', 'ignore', 'ignore'] };
        var that = this;
        that.spawnCommand('git', ['init'], spawnOptions)
        .on('close', function(code) {
          that.spawnCommand('git', ['add', '--all'], spawnOptions)
          .on('close', function(code) {
            that.spawnCommand('git', ['commit', '-m', 'init'], spawnOptions)
            .on('close', function() {
              done();
            });
          });
        });
      }
    },
  }
  
});
