# dominatr-grunt

Build all the things!

## Use

dominatr-grunt contains the standard build process configuration for Vokal web project that use [load-grunt-config](https://github.com/firstandthird/load-grunt-config).

The configuration of this project should stay in sync with dominatr's generation schemes and to prevent any confusion, the major and minor release versions of dominatr and dominatr-grunt should stay in sync.

dominatr should contain these prerequisites to use dominatr-grunt

`Gruntfile.js` should specify a `configPath` that points at dominatr-grunt, and provide an `overridePath` that points at a user editable directory.

```js
require( "load-grunt-config" )( grunt, {
    configPath: path.join( process.cwd(), "node_modules", "dominatr-grunt", "grunt" ),
    overridePath: path.join( process.cwd(), "grunt" )
} );
```

`package.json` should include a dependency on `dominatr-grunt` with a locked minor version, like 1.3.x. This version should not allow the major or minor to automatically upgrade.


## History

#### 2.1.0 Use EJS for conditional source file inclusion

To upgrade:
```
npm install grunt-ejs --save
npm uninstall grunt-usemin --save
```

In `index.js` replace script tag

`<script src="/build/project.js?v={{ VERSION }}"></script>`

with

```
<% if (useSource) { %>
<!-- include: "type": "js", "files": "build/modules/*/*.js" -->
<!-- include: "type": "js", "files": "build/modules/*/*/*.js" -->
<% } else { %>
<script src="/build/project.js?v={{ VERSION }}"></script>
<% } %>
```

#### 2.2.0 Add [PostCSS](https://github.com/nDmitry/grunt-postcss) and [Autoprefixer](https://github.com/postcss/autoprefixer)

To upgrade:
```
npm install grunt-postcss autoprefixer-core --save
```

#### 2.2.1 Add [Grunt-newer](https://github.com/tschaub/grunt-newer) and updates to jshint

To upgrade:
```
npm install grunt-newer --save
```