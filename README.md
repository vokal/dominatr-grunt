# dominatr-grunt

> Build all the things!

## Getting Started
This plugin requires Grunt `>=0.4.0` and a lengthy list of other dependencies. Make sure to add `"dominatr-grunt": "github:vokal/dominatr-grunt#<commitHash>"` to your package `dependencies` and paste the `peerDependencies` from our `package.json` file [here](https://github.com/vokal/dominatr-grunt/blob/master/package.json) to your local `devDependencies`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install github:vokal/dominatr-grunt --save-dev
```

## Use

This build process is designed for javascript web projects and deployment through [Amazon Web Services](https://aws.amazon.com/). While not every task may be in use on a given project, these tasks were found to be useful for most of them. Unique needs for projects can arise and `load-grunt-config` provides easy configuration changes where necessary.

There is no guarantee that this will work on less than Node `v4` or npm `v2.14`, so please take that into consideration as necessary.

## Configuration

dominatr-grunt contains the standard build process configuration for Vokal web projects. It uses [load-grunt-config](https://github.com/firstandthird/load-grunt-config) to keep our build process in sync across multiple projects. The [project structure](#project_structure) is important for dominatr-grunt to work effectively and will be described in more detail below.

Configuration of this plugin relies heavily on 3 files:

- #### `Gruntfile.js`
  Setup for projects is simple with `load-grunt-config`.

  ```js
  module.exports = function ( grunt )
  {
      "use strict";

      // for environment configuration
      var env = grunt.option( "env" ) || "local";
      grunt.initConfig( {
          env: grunt.file.readJSON( "env.json" )[ env ],
          envName: env
      } );

      var path = require( "path" );
      require( "load-grunt-config" )( grunt, {
          data: {
              version: grunt.option( "gitver" ) || Date.now() // for deployment cache-busting
          },
          configPath: path.join( process.cwd(), "node_modules", "dominatr-grunt", "grunt" ),
          overridePath: path.join( process.cwd(), "grunt" ),
          mergeFunction: function ( obj, ext )
          {
              return require( "config-extend" )( obj, ext );
          }
      } );
  };
  ```

  The `configPath` points to `npm`'s installation of dominatr-grunt and lets the project root `grunt` folder [override these tasks](#overriding_tasks) where necessary.

- #### `package.json`
  The dependency on dominatr-grunt should be locked with a minor version, like `6.0.x`. Also, a handful of shortcuts are provided that can be included in your package file `scripts` section.

  ```json
  "scripts": {
    "install": "node ./node_modules/.bin/webdriver-manager update",
    "server": "grunt connect:local:keepalive",
    "start": "grunt build connect:local watch",
    "test": "grunt test",
    "teststack": "grunt teststack"
  }
  ```

  The oddball `install` script ensures that `protractor` tests will function properly by downloading or updating the proper drivers.

- #### `env.json`
  dominatr-grunt supports any number of development/deployment environments, but depends on one `local` configuration. Environments should be in this root file and include any configurable settings.
  ```json
  {
    "local": {
      "apiroot": "https://api-dev.yourappname.com",
      "libraryKey": "third-party-library-key"
    }
  }
  ```
  Working with different environments is rather simple, just provide a `--env=name` flag when running any `grunt` task to swap to a different configuration. Here's an example `env.json` file with deployment environment settings:
  ```json
  {
    "local": {
      "apiroot": "http://localhost:4000",
      "libraryKey": "third-party-library-key"
    },
    "dev": {
      "apiroot": "https://api-dev.yourapp.com",
      "libraryKey": "third-party-library-key",
      "aws.s3Bucket": "yourapp-dev",
      "aws.distributionId": "ABCDEFGHIJKLMN"
    },
    "staging": {
      "apiroot": "https://api-staging.yourapp.com",
      "libraryKey": "third-party-staging-key",
      "aws.s3Bucket": "yourapp-staging",
      "aws.distributionId": "OPQRSTUVWXYZAB"
    },
    "prod": {
      "apiroot": "https://api.yourapp.com",
      "libraryKey": "third-party-production-key",
      "aws.s3Bucket": "yourapp-prod",
      "aws.distributionId": "JKLMNOPQRSTUVW"
    }
  }
  ```

  The `npm start` task by default uses the `local` environment but can be changed by including the `env` flag in the `start` script of the `package.json` file.

## Project Structure

Our build process is primarily designed to work with [angular](https://angularjs.org/), but can work with any module based development.

Here are the basic required root files for dominatr-grunt to function.

```
.jshintrc
env.json
Gruntfile.js
package.json
```

The source folder is as follows.

```
source/
  |-- fonts
  |-- images
  |-- modules
    |-- index.js
    |-- _app
      |-- index.js
      |-- styles
        |-- main.less
        |-- *.less
      |-- templates
        |-- index.html
        |-- *.html
      |-- <other subfolders>
        |-- *.js
    |-- <other module folders>
```

There are a few important files to take note of in our `/source` directory.

- #### `/modules/index.js`
  This is the main `.js` file and should be used to require any dependencies. Anything that needs to be set globally should be attached here.

  All module folders (except `mocks`, see below) should be `require`d. At the end of the file, the `ngtemplates` output must also be required.
  ```js
  "use strict";

  global.angular = require( "angular" );

  require( "angular-route" );
  require( "angular-touch" );

  require( "./_app" );
  require( "./<other module folders>" );

  require( "../../build/templates.js" );
  ```

  Module directories should include an `index.js` file or the file should be specified like `require( "./thing/module.js" )`.

- #### `/modules/_app/index.js`
  In an angular application, this is where you would define your app module. The only requirement here is to `require` other scripts in your `.js` subfolders.

  ```js
  angular.module( "App", [] )
    .service( "CoolSrvc", require( "./services/coolThing" ) )
    .filter( "fullName", require( "./filters/fullName" ) );
  ```

  You don't need to include `.js` in the file paths. If you have complex angular `config` or `run` blocks, you can require those like `.run( require( "./run" ) )` and place a `run.js` file next to the module index file.

- #### `/modules/_app/templates/index.html`
  This is your main index file with `<head>` and `<body>` declarations. It is not included in the `ngtemplates` task, just copied during the `build` task. All other `.html` files in module `templates` directories are watched and included in the `ngtemplates` task.

- #### `/modules/_app/styles/main.less`
  This is the main `.less` file for generating the `project.css` file in the `build` step. While all `.less` files in any module `styles` subdirectory is watched for changes, only this file is used in the `grunt less` task.

  To include other module styles into this file, you can use `@import "../../moduleName/styles/fileName"`. You can ignore the `.less` extension in these imports. To import css files from third party modules, you can perform the following:
  ```less
  // create shortcut to the node_modules folder
  @nodeModules: "../../../../node_modules";
  // import inline
  @import (inline) "@{nodeModules}/ng-dialog/css/ngDialog.css";
  @import (inline) "@{nodeModules}/toastr/build/toastr.min.css";
  ```

- #### `/modules/mocks`
  The `mocks` directory is special in that it is excluded in all environments except `local`. It is also excluded from code coverage reports since it is code not being included in a deployment.

  While this is not the appropriate place to discuss _how_ to use mocks, know that a `/modules/mocks/index.js` file is included by default when running locally and any support files should be `require`d from that point.

- #### Other Script Files
  All other subfolder script files should include a `module.exports` value so that it can be required by the module `index.js` or alternate declaration file. For most angular singletons, the format will look similar to the following:

  ```js
  "use strict";

  module.exports = [ "SomeSrvc", "$q",
      function ( SomeSrvc, $q )
      {
          // stuff here
      }
  ];
  ```

## Grunt Tasks

A list of all available `grunt` tasks can be found by running `grunt -h` or `grunt --help`. The default `grunt` task runs the `grunt build` alias. More documentation on each plugin can be found on their respective github or npm pages.

This list aims to be a reference and may not cover every detail of our implementation. Please consult our task configuration files if more detail is needed.

- #### browserify
  There are two browserify tasks available with dominatr-grunt, `build` and `test`.

  - `browserify:build` generates a `dist.js` file in the `build` directory
  - `browserify:test` includes istanbul code coverage and generates the dist file in the `.instrumented` folder

  Both tasks include mocks when in the `local` environment. If you wish to change the root file used for mocks from `modules/mocks/index.js`, you can provide a flag like `--mocks=other.js` and it will look for `modules/mocks/other.js` instead.

  String replacement is also handled in the browserify tasks. The selected environment object from `env.json` file is read in and key-value replaced in files. To prevent conflict with angular, keys should be wrapped like `<< keyName >>`. Objects are reduced to strings separated as dot notation, so both `"obj.someKey"` and `"obj": { "someKey": ... }` replace `<< obj.someKey >>`.

- #### clean
  Three subtasks, `build`, `test`, and `coverage`, to delete their respective directories.

- #### cloudfront
  Deployment task to create an 'invalidation' after files have been uploaded to s3

- #### connect
  Local file server, using port `3000` for development and `9000` for testing. Middleware is setup to serve the index file when there is no file extension specified.

- #### copy
  Move static files from multiple directories to the build folder, particularly the main `index.html` file.

- #### filerev
  Additional cache-busting power utilized in deployment. Includes a `filerev_replace` task to update build files of filenames changed using `filerev`.

- #### imagemin
  Minification of images during deployment.

- #### jshint
  `js` standards control using [jshint](http://jshint.com/). This task requires a `.jshintrc` file to be located in the project root. Configuration options for this file can be found [here](http://jshint.com/docs/options/).

- #### less
  CSS pre-processor, more information can be found on [their website](http://lesscss.org/).

- #### localstack
  Method of communicating with Browserstack for testing. Only utilized when running `grunt teststack` or `npm run teststack`.

- #### ngtemplates
  Compiles a `templates.js` file in the build directory with all of the `modules/*/templates/*.html` files for caching in angular. When referencing these files in an angular app, the file path should be similar to `modules/<modulename>/templates/<filename>.html`.

- #### postcss
  Removes unnecessary vendor prefixes using [Autoprefixer](https://github.com/postcss/autoprefixer) and includes minification when using a `prod` environment.

- #### protractor_coverage
  Testing task, split for `local` and `stack` options. The latter is designated for Browserstack. See the `grunt test` and `grunt teststack` aliases below.

- #### robots
  Custom task for writing a `robots.txt` file during a deployment. The content of the file is determined by the environment and a `host` value in the `env.json` file.

- #### s3
  Deployment task for sending files to an AWS s3 bucket.

- #### svg_sprite
  Generates svg sprites and their `.css` files based on images located in the `source/images/svg-sprite` directory. The output folder is `build/svg-sprite`.

- #### svgmin
  Minification for `.svg` files during deployment.

- #### truecolors_less
  Converts a truecolors file to a `.less` file. More documentation can be found [here](https://github.com/vokal/grunt-truecolors-less).

- #### uglify
  Deployment task to minify (and mangle) the crap out of the `dist.js` file.

- #### watch
  A multitude of targets to keep development moving without having to manually run builds. Uses livereload by default on any file served through `connect:local`. Has actions for changes to:
  - all `.html` files in `modules/*/templates`
  - all `.js` files in `modules/**`
  - `build/templates.js`
  - all `.less` files in `modules/*/styles`
  - svg files in `source/images/svg_sprite


## Grunt Aliases

The following group tasks are available as `grunt <taskname>` for direct use:

#### `build`
Runs associated tasks to generate a working build folder, including at the least `clean:build`, `less`, `copy`, and `browserify:build`. It is included when running `npm start`.

#### `test`
Runs protractor testing locally with `protractor_coverage` and reporting. Generates a temporary `.instrumented` folder to hold test files and deletes it on completion. This also runs `jsint`. The configuration file for testing is located at `/tests/config/protractor-config.js`.

#### `teststack`
Only different from `test` in that it uses [Browserstack](https://www.browserstack.com) instead of a local browser. Configuration for this is in `/tests/config/protractor-config-browserstack.js`. An authorization key for Browserstack must be in the environment variable `BROWSERSTACK_KEY` for this to work.

#### `deploy`
Clean build and packaging for output, an `--env` flag should be specified when running this task and requires including AWS credentials if using s3 and cloudfront. The full command would look similar to `grunt deploy --env=staging --aws-access-key-id=<aws-access-key> --aws-secret-access-key=<lengthy-aws-access-token>`

Three additional aliases are created for internal shortcuts but should not be used except for debugging situations:
- `pretest`
- `posttest`
- `package`

## Overriding Tasks

To override an existing grunt task or subtask, create a `grunt` folder in your project root directory and a filename matching the task name per `load-grunt-config`. For example, if you need to override the `copy:index` subtasks, you'd create `/grunt/copy.js` with something like the following:

```js
"use strict";

module.exports = {
    index: {
        src: "source/path/to/index.html",
        dest: "build/index.html"
    }
};
```

Replacements are done at the subtask level, so the file above would not destroy the `copy:build` task in the process. For more information on writing task files, view the `load-grunt-config` [documenation](https://github.com/firstandthird/load-grunt-config#grunt-tasks-files).

## Other Bits

While not required, we suggest adding the following lines to your `.gitignore` file.

```
/build
/coverage
/.instrumented
```

The `/coverage` and `/.instrumented` directories are used during testing and erased with each run. Files in these folders are not intended to be committed. The `/build` folder contents changes with the current environment settings and is not fit for version control.
