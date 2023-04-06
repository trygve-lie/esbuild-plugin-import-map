# [3.0.0-next.2](https://github.com/trygve-lie/esbuild-plugin-import-map/compare/v3.0.0-next.1...v3.0.0-next.2) (2022-06-15)


### Features

* Make first argument to .load() the base URL ([789ead3](https://github.com/trygve-lie/esbuild-plugin-import-map/commit/789ead3115384ed0b7822b168a0ad073943e363b))


### BREAKING CHANGES

* The first argument to the `.load()` method now takes a base URL which the import map parser will use when parsing.

# [3.0.0-next.1](https://github.com/trygve-lie/esbuild-plugin-import-map/compare/v2.1.0...v3.0.0-next.1) (2022-06-13)


### Bug Fixes

* Lint love ([1b5efdd](https://github.com/trygve-lie/esbuild-plugin-import-map/commit/1b5efddc7a049503b44fd2d27f5a61deaa4454fa))


### Features

* Support full import map mapping ([50c021d](https://github.com/trygve-lie/esbuild-plugin-import-map/commit/50c021d1d05b5890068e296f920ebb9decdb8770))


### BREAKING CHANGES

* Module should now be spec compliant and this might break builds where parts of an import map might have been ignored. The `load()` do now also take a second argument for setting a base URL to be applied to relative import references.
