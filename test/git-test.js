var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('git', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable: true,
        isGruntAvailable: false,
        isJsHintAvailable: false
      })
      .on('end', done);
  });

  it('should copy .gitignore', function() {
      assert.file([
        '.gitignore',
      ]);
  });

  it('should initiate local git repo', function() {
      assert.file([
        '.git'
      ]);
  });

});
