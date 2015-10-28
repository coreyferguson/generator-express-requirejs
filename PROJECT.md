
# Project Details

## Directory Structure

File                          | Short Description
----------------------------- | -----------------
Gruntfile.js                  | [Grunt](http://gruntjs.com/) build file.
public/js/index.js            | Browser JS entry-point. **Your code goes here.**
public/js/requirejs-config.js | [RequireJS](http://requirejs.org/) shim config. See below section on *Frontend Dependencies*.
public/index.html             | Browser HTML entry-point. **Your code goes here.**
.gitignore                    | [Git](https://git-scm.com) ignore file.
.bowerrc                      | [bower-requirejs](https://github.com/yeoman/bower-requirejs) hook
.yo-rc.json                   | [Yeoman](http://yeoman.io) configuration file.
bower.json                    | [Bower](http://bower.io) for frontend dependencies.
package.json                  | [npm](https://www.npmjs.com) for backend dependencies.
app.js                        | Server-side entry-point. **Your code goes here.**

## Frontend Dependencies

Frontend dependencies can be installed with bower:

```bash
bower install --save-dev dependency-name
```

The `.bowerrc` hook will automatically wire this up for RequireJS to use. Take a look at `public/js/requirejs-config.js` to see.