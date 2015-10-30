var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt-jshint', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable: false,
        isGruntAvailable: true,
        isGruntBumpAvailable: false,
        isJsHintAvailable: true
      })
      .on('end', done);
  });

  it('should add relevant information in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-contrib-jshint'\);/);
    assert.fileContent('Gruntfile.js', /jshint: {/);
    assert.fileContent('Gruntfile.js', /grunt.registerTask\('default', \[.*'jshint'/);
  });

});
