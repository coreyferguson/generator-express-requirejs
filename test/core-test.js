var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('required features', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable: false,
        isGruntAvailable: false
      })
      .on('end', done);
  });

  it('should copy required files', function() {
      assert.file([
        'app.js',
        'bower.json',
        '.bowerrc',
        'package.json',
        'public/index.html',
        'public/js/index.js',
        'public/js/requirejs-config.js'
      ]);
  });

  it('should not copy optional files', function() {
    assert.noFile([
      'Gruntfile.js',
      '.gitignore',
      '.git'
    ]);
  });

});
