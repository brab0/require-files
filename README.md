require-files
=============
Require files with wildcards

## Install
```bash
$ npm install require-files --save
```

## Methods
### get(includePaths, excludePaths)
It returns an array with every file found based on a wildcard string. `excludePaths` are not required.

```javascript
const files = require('require-files').get('my/path/**/*.js');    
```

### only(includePaths, excludePaths)
requires all files (without returning) found based on a wildcard string. `excludePaths` are not required.

```javascript
require('require-files').only('my/path/**/*.js');    
```
