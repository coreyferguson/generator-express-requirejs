var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
  },

  configuring: function () {
    this.destinationRoot(this.appname);
    this.config.set('templateModel', {
      project: {
        name: this.appname
      }
    });
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
    }
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
    }
  }
  
});
