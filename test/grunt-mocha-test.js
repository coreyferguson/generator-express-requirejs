var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('grunt-mocha', function() {

  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        isGitAvailable:       false,
        isGruntAvailable:     true,
        isGruntBumpAvailable: false,
        isJsHintAvailable:    false,
        isMochaAvailable:     true
      })
      .on('end', done);
  });

  it('should copy required files', function() {
    assert.file([
      'test/client/spec/app-test.js',
      'test/client/spec/example-test.js',
      'test/client/karma.conf.js',
      'test/client/test-main.js',
      'test/server/example-test.js'
    ]);
  });

  it('should load mocha npm task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-mocha-test'\);/);
  });

  it('should load karma npm task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.loadNpmTasks\('grunt-karma'\);/);
  });
    
  it('should define mochaTest config in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /mochaTest: \{/);
  });
    
  it('should define karma config in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /karma: \{/);
  });
    
  it('should register test task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.registerTask\('test', \[/);
  });
    
  it('should register default task in Gruntfile.js', function() {
    assert.fileContent('Gruntfile.js', /grunt.registerTask\('default', \[/);
  });

});
