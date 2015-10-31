var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable:       false,
        isGruntAvailable:     true,
        isGruntBumpAvailable: false,
        isJsHintAvailable:    false,
        isMochaAvailable:     false
      })
      .on('end', done);
  });

  it('should copy Gruntfile.js', function() {
    assert.file([
      'Gruntfile.js',
    ]);
    assert.fileContent('Gruntfile.js', /pkg: grunt.file.readJSON\('package.json'\)/);
  });

  it('should not add optional modules in Gruntfile.js', function() {
    // grunt-bump
    assert.noFileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-bump'\);/);
    assert.noFileContent('Gruntfile.js', /bump: \{/);
    // jshint
    assert.noFileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-contrib-jshint'\);/);
    assert.noFileContent('Gruntfile.js', /jshint: {/);
    // mocha
    assert.noFileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-mocha-test'\);/);
    assert.noFileContent('Gruntfile.js', /mochaTest: \{/);
  });

});
