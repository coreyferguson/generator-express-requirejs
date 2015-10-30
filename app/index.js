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
        message: 'Configure git',
        default: true
      },
      {
        type: 'confirm',
        name: 'isGruntAvailable',
        message: 'Configure grunt',
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
        message: 'Configure jshint',
        default: true,
        when: function(answers) {
          return answers.isGruntAvailable;
        }
      }
    ], function (answers) {
      this.project = {
        name: this.appname
      };
      this.environment = {
        isGitAvailable: answers.isGitAvailable,
        isGruntAvailable: answers.isGruntAvailable,
        isGruntBumpAvailable: (answers.isGruntAvailable ? answers.isGruntBumpAvailable : false),
        isJsHintAvailable: answers.isJsHintAvailable
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
          this.gruntfile.insertConfig('jshint', "{ 'grunt': 'Gruntfile.js', 'app': 'public/js/**/*.js' }");
          this.gruntfile.loadNpmTasks('grunt-contrib-jshint');
          defaultGruntTasks.push('jshint');
        }

        // register default task
        if (defaultGruntTasks.length > 0) {
          this.gruntfile.registerTask('default', defaultGruntTasks);
        }
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
        var spawnOptions = { stdio: ['ignore', 'ignore', 'ignore'] };
        var that = this;
        that.spawnCommand('git', ['init'], spawnOptions)
        .on('close', function(code) {
          that.spawnCommand('git', ['add', '--all'], spawnOptions)
          .on('close', function(code) {
            that.spawnCommand('git', ['commit', '-m', 'init'], spawnOptions);
          });
        });
      }
    },
  }
  
});
