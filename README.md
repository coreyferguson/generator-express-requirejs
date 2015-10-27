
# express-requirejs

## Summary

Yeoman generator for an express web application with require.js dependency management.

Features:

Technology                                            | Required
------------------------------------------------      | --------
[express](https://github.com/strongloop/express)      | Yes
[requirejs](http://requirejs.org)                     | Yes
[bower](http://bower.io)                              | Yes
[git](https://git-scm.com)                            | No
[grunt](http://gruntjs.com/)                          | No
[grunt-bump](https://github.com/vojtajina/grunt-bump) | No

## Usage

```bash
npm install -g generator-express-requirejs
yo express-requirejs name-of-project
```

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
