
# Project Details

## Directory Structure

	$ tree
	.
	├── bower.json // Bower for frontend dependencies.
	├── Gruntfile.js // Grunt build file.
	├── package.json // npm for backend dependencies.
	├── src
	│   ├── client
	│   │   ├── index.html // Browser HTML entry-point. **Your code goes here.**
	│   │   ├── js
	│   │   │   ├── app.js // Browser JS entry-point. **Your code goes here.**
	│   │   │   └── example-component.js // An example that can be deleted.
	│   │   └── requirejs-main.js // RequireJS shim config. See below section on *Frontend Dependencies*.
	│   └── server
	│       └── app.js // Server-side entry-point. **Your code goes here.**
	└── test
	    ├── client
	    │   ├── karma.conf.js // Karma test runner configuration.
	    │   ├── spec
	    │   │   ├── app-test.js // unit test for src/client/js/app.js
	    │   │   └── example-test.js // An example that can be deleted.
	    │   └── test-main.js // RequireJS shim config for test suite. See below section on *Frontend Dependencies*.
	    └── server
	        └── example-test.js // An example that can be deleted.


## Frontend Dependencies

Frontend dependencies can be installed with bower:

```bash
bower install --save-dev dependency-name
```

The `.bowerrc` hook will automatically wire this up for RequireJS to use. Take a look at `public/js/requirejs-main.js` to see.

Unfortunately, **the paths are not automatically wired** into the `test/client/test-main.js`. You can manually copy+paste from `public/js/requirejs-config.js` after installing with bower.

## Usage

### Starting the web application

```bash
node src/server/app.js
```

### Building and testing the application

```bash
grunt
```

### Running Karma in continous mode

```bash
grunt karma:continuous
```
