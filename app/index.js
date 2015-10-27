var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });
  },

  prompting: function() {
    var done = this.async();
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
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
      }
    ], function (answers) {
      this.project = {
        name: this.appname
      };
      this.environment = {
        isGitAvailable: answers.isGitAvailable,
        isGruntAvailable: answers.isGruntAvailable,
        isGruntBumpAvailable: (answers.isGruntAvailable ? answers.isGruntBumpAvailable : false)
      };
      done();
    }.bind(this));
  },

  configuring: function () {
    this.destinationRoot(this.appname);
    this.config.set('templateModel', {
      project: this.project,
      environment: this.environment
    });
  },

  writing: {
    express: function() {
      var model = this.config.get('templateModel');
      this.fs.copyTpl(
        this.templatePath('writing/**/*'),
        this.destinationPath(),
        model);
      this.fs.copyTpl(
        this.templatePath('writing/**/.*'),
        this.destinationPath());
      if (this.environment.isGitAvailable) {
        this.fs.copyTpl(
          this.templatePath('git/**/.*'),
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
      this.bowerInstall('requirejs');
    },
    grunt: function() {
      // grunt
      if (this.environment.isGruntAvailable) {
        this.npmInstall('grunt');
        this.gruntfile.insertConfig('pkg', 'grunt.file.readJSON("package.json")');

        // grunt-bump
        if (this.environment.isGruntBumpAvailable) {
          this.npmInstall('grunt-bump');
          this.gruntfile.insertConfig('bump', "{ options: { push: false } }");
          this.gruntfile.loadNpmTasks('grunt-bump');
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
        var that = this;
        that.spawnCommand('git', ['init'])
        .on('close', function(code) {
          that.spawnCommand('git', ['add', '--all'])
          .on('close', function(code) {
            that.spawnCommand('git', ['commit', '-m', 'init']);
          });
        });
      }
    },
  }
  
});
