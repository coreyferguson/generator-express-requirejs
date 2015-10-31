var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt-bump', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable:       true,
        isGruntAvailable:     true,
        isGruntBumpAvailable: true,
        isJsHintAvailable:    false,
        isMochaAvailable:     false
      })
      .on('end', done);
  });

  it('should load npm task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-bump'\);/);
  });

  it('should define bump config in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /bump: {/);
  });

});
