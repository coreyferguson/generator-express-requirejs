var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt-bump', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable: true,
        isGruntAvailable: true,
        isGruntBumpAvailable: true
      })
      .on('end', done);
  });

  it('should add relevant information in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-bump'\);/);
    assert.fileContent('Gruntfile.js', /bump: {/);
  });

});
