# dominatr-grunt

## Changelog

#### 6.1.0 Add Slack channel notifications

This is not included in deployment by default in this release, so to use, after deployment runs:

`grunt notification_slack --env=dev --slacktoken=$SLACK_TOKEN`

In the above replace `dev` with whatever the environment is and set an environment variable with a Slack API Token which you can generate from [the bottom of this page](https://api.slack.com/web).

Setting "notification.slackChannel" for each environment in `env.json` is also required.

#### 6.0.0 [Breaking Changes] Drop bower for browserify; massive refactor

A quick reference to the big changes for v6:
- transition to Browserify from Bower
- drop support for less than Node v4
- drop `grunt/env.js` for `/env.json` and better environment support
- switch `grunt-replace` wrap from `{{ }}` to `<< >>`
- reorganize `package.json` and grunt alias scripts
- run tests on separate instrumented folder and port
- separate deployment tasks (`uglify`, `svgmin`, `filerev`) from main `build`
- remove Karma unit testing from default `npm test`, available as an option ( TODO )
- deployment changes that affect AWS settings

To upgrade:

- point to v6.0.x of `dominatr-grunt`
- update `package.json` devDependencies and scripts to v6 of `dominatr`
- move all bower install components to `package.json` dependencies
- replace these files with their `dominatr` v6 counterpart:
    - gruntfile.js
    - run-build.sh
    - .drone.yml
    - .gitignore
- create `env.json` in root directory and move `grunt/env.js` values to it
- move `grunt-replace` values to `env.json`, change all replace references to `<< >>` wrapping
- browserify module structure, see `dominatr` for example structure
- update `index.html` to use single `dist.js` output
- link third party library css files in `main.less`
- remove `/build` root from all resource references (html, css, fonts, js)
- delete unnecessary files:
    - bower.json
    - .bowerrc
    - source/components/
    - grunt/
    - server.js
- `npm install`
- `npm start`
- make changes on cloudfront distributions to reference `/index.html` instead of `/build/index.html`
    - General > Default Root Object
    - Error Pages > 403 > Response Page Path


#### 5.0.4 Delete broken releases, move CHANGELOG

Delete releases `5.0.2` and `5.0.3` due to a dependency breaking change. Updates for `autoprefixer` will be included in a `6.0.0` release. Also moved CHANGELOG out of `README.md` and into own file.

#### 5.0.3 Add license to `package.json`

Added MIT license

#### 5.0.2 Update autoprefixer dependency

`autoprefixer-core` was deprecated after components merged into `autoprefixer` 6.0

#### 5.0.1 Fix watch environment

watch file should refer to envLocal

#### 5.0.0 [Breaking Changes] robots.txt and sitemap handling; add 4th environment.

The reference to sitemap.txt that is in the robots.txt file requires the hostname, which should be added to the `envProd` task in `grunt/env.js` like this:

```js
grunt.config( "Host", "<http(s)://www.domain.com>" );
```

Also in `grunt/env.js`, the `envDev` task should be renamed `envLocal`.

If a development deployment is required, an `envDev` task should be added to `grunt/env.js`:

```js
grunt.registerTask( "envDev", "Set environment variables for dev deployment", function ()
{
    grunt.config( "aws.s3Bucket", "<s3-bucket-name>" );
    grunt.config( "aws.cloudfrontDistributionId", "<cloudfront-dist-id>" );

    grunt.config( "APIRoot", "<dev-api-path>" );
} );
```

And the above is then used from `.drone.yml` by replacing `deploystaging` with `deploydev`.

#### 4.0.3 Always clean before building

Resets the build folder after running tests.

#### 4.0.2 Add livereload to `grunt watch`

Nothing is needed to upgrade, but to use LiveReload you will need a browser extension. Install one for your browser from [here](http://livereload.com/extensions/), and click the extension while `grunt watch` is running.

#### 4.0.1 [Breaking Changes] Cache and versioning changes

To upgrade:

- remove all `?v={{ VERSION }}` strings from your project
- `npm install grunt-filerev --save`
- `npm install grunt-filerev-replace --save`


#### 3.0.0 [Breaking Changes] Run jshint with tests, fail drone builds

To upgrade, make sure the jshint report you get when running local tests comes back clean.  Projects that may have previously passed on drone will now fail if they have jshint errors.

Additionally, jshint will no longer fail tasks during `grunt watch`.


#### 2.4.2 More minification, deferred JS loading, optimize workflow

To upgrade, replace all `script` tag logic at the bottom of your `index.html` file with the following:
```html
<% if( useDist ) { %>
<script src="/build/dist.js?v={{ VERSION }}" defer></script>
<% } else { %>
<script src="/build/angular.js?v={{ VERSION }}"></script>
<script src="/build/components.js?v={{ VERSION }}"></script>
<% if( useSource ) { %>
<!-- include: "type": "js", "files": "build/modules/*/*.js" -->
<!-- include: "type": "js", "files": "build/modules/*/*/*.js" -->
<% } else { %>
<script src="/build/project.js?v={{ VERSION }}"></script>
<% } %>
<script src="/build/templates.js?v={{ VERSION }}"></script>
<% } %>
```

#### 2.3.0 Add [Grunt-newer](https://github.com/tschaub/grunt-newer) and updates to jshint

To upgrade:
```
npm install grunt-newer --save
```

#### 2.2.0 Add [PostCSS](https://github.com/nDmitry/grunt-postcss) and [Autoprefixer](https://github.com/postcss/autoprefixer)

To upgrade:
```
npm install grunt-postcss autoprefixer-core --save
```

#### 2.1.0 Use EJS for conditional source file inclusion

To upgrade:
```
npm install grunt-ejs --save
npm uninstall grunt-usemin --save
```

In `index.html` replace script tag

```html
<script src="/build/project.js?v={{ VERSION }}"></script>
```

with

```html
<% if (useSource) { %>
<!-- include: "type": "js", "files": "build/modules/*/*.js" -->
<!-- include: "type": "js", "files": "build/modules/*/*/*.js" -->
<% } else { %>
<script src="/build/project.js?v={{ VERSION }}"></script>
<% } %>
```
