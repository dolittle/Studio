# Build related artifacts

When using WebPack for building, some packages won't necessarily work out of the box as they
have not been designed for that in mind. Often at times it is parts we don't need from the package
that fail. As a workaround to the problem, we replace the problematic module by using the
replacement plugin in WebPack and point to a module that removes the problem:

```javascript
    config.plugins.push(
        new wp.NormalModuleReplacementPlugin(/platform-shims\/esm.mjs/, 'devcentral/backend/_build/esm.js')
    );
```
