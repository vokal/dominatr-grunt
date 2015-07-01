# grunt-dominatr

Build all the things!

## Use

grunt-dominatr contains the standard build process configuration for Vokal web project that use [load-grunt-config](https://github.com/firstandthird/load-grunt-config).

The configuration of this project should stay in sync with dominatr's generation schemes and to prevent any confusion, the major and minor release versions of dominatr and grunt-dominatr should stay in sync.

dominatr should contain these prerequisites to use grunt-dominatr

`Gruntfile.js` should specify a `configPath` that points at grunt-dominatr, and provide an `overridePath` that points at a user editable directory.

```js
require( "load-grunt-config" )( grunt, {
    configPath: path.join( process.cwd(), "node_modules", "grunt-dominatr", "grunt" ),
    overridePath: path.join( process.cwd(), "grunt" )
} );
```

`package.json` should include a dependency on `grunt-dominatr` with a locked minor version, like 1.3.x. This version should not allow the major or minor to automatically upgrade.
