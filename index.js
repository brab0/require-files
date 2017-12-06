var _ = require('lodash'),
 glob = require('glob');

var _this = this;

function get(globPatterns, excludes) {
  let path = __dirname.split('/')  
  const root = path.splice(0, path.length - 2).join('/');  

  globPatterns = globPatterns.map(gp => gp[0] === '/' ? gp : root + '/' + gp);

  var opts = {};
  
  { absolute: true }

  return explore(globPatterns, excludes);
};

/* deprecate */
function only(path, excludes){
  get(path, excludes).forEach(p => {
      require(p);
  });
}

function call(path, excludes){
  get(path, excludes).forEach(p => {
      require(p);
  });
}

function assemble(path, excludes, regexName){
  return get(path, excludes).reduce((prev, crr) => {
    var key = p.split("/").pop();

    if(regexName)
      key = p.match(regexName)[0];

    return Object.assign(prev, { [key] : require(p) });
  }, {});
}

function explore(globPatterns, excludes){  
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  var output = [];

  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, explore(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {    
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns, { ignore: excludes, root: "" });
      
      output = _.union(output, files);
    }
  }
  return output;
}

module.exports = {
  get : get,
  assemble : assemble,
  only : only,
  call : call
}
