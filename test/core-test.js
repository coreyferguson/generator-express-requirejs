var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('required features', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name:                 'test',
        isGitAvailable:       false,
        isGruntAvailable:     false,
        isGruntBumpAvailable: false,
        isJsHintAvailable:    false,
        isMochaAvailable:     false
      })
      .on('end', done);
  });

  it('should copy required files', function() {
      assert.file([
        'src/server/app.js',
        'bower.json',
        '.bowerrc',
        'package.json',
        'src/client/index.html',
        'src/client/js/app.js',
        'src/client/requirejs-main.js'
      ]);
  });

  it('should not copy optional files', function() {
    assert.noFile([
      'Gruntfile.js',
      '.gitignore',
      '.git',
      'test'
    ]);
  });

});
