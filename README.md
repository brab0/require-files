require-files
=============
Require files with wildcards

## Methods
### get(includePaths, exludePaths)
It returns an array with every file found based on a wildcard string. `exludePaths` are not required.

```javascript
    const files = require('require-files').get('my/path/**/*.js');    
```

### only(includePaths, exludePaths)
requires all files (without returning) found based on a wildcard string. `exludePaths` are not required.

```javascript
    require('require-files').only('my/path/**/*.js');    
```