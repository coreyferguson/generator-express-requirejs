var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable: true,
        isGruntAvailable: true,
        isGruntBumpAvailable: false
      })
      .on('end', done);
  });

  it('should copy Gruntfile.js', function() {
    assert.file([
      'Gruntfile.js',
    ]);
  });

});
