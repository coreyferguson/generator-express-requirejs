
# express-requirejs Yeoman Generator

## Summary

[Yeoman](http://yeoman.io) generator for an express web application with require.js dependency management.

Features:

Technology                                                   | Required
------------------------------------------------------------ | --------
[Express](https://github.com/strongloop/express)             | Yes
[RequireJS](http://requirejs.org)                            | Yes
[Bower](http://bower.io)                                     | Yes
[bower-requirejs](https://github.com/yeoman/bower-requirejs) | Yes
[Git](https://git-scm.com)                                   | No
[Grunt](http://gruntjs.com/)                                 | No
[grunt-bump](https://github.com/vojtajina/grunt-bump)        | No

## Usage

```bash
npm install -g generator-express-requirejs
yo express-requirejs name-of-project
```

Check [here](PROJECT.md) for more in-depth information about the generated project.

## Contributor Usage

```bash
git clone git@github.com:coreyferguson/generator-express-requirejs.git
cd generator-express-requirejs
npm install
grunt
```

To run generator with local build, link the generator to npm by executing this from the project directory: 

```bash
npm link
```
