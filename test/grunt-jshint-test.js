var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt-jshint', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable:       false,
        isGruntAvailable:     true,
        isGruntBumpAvailable: false,
        isJsHintAvailable:    true,
        isMochaAvailable:     false
      })
      .on('end', done);
  });

  it('should load npm task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-contrib-jshint'\);/);
  });
    
  it('should define bump config in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /jshint: {/);
  });
    
  it('should register test task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.registerTask\('test', \[.*'jshint'/);
  });

  it('should register default task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.registerTask\('default', \[.*'test'/);
  });

});
