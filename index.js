var _ = require('lodash'),
 glob = require('glob');

var _this = this;

function get(globPatterns, excludes) {
  let path = __dirname.split('/')  
  const root = path.splice(0, path.length - 2).join('/');  

  globPatterns = globPatterns.map(gp => root + '/' + gp);

  return explore(globPatterns, excludes);
};

function only(path, excludes){
  get(path, excludes).forEach(command => {
      require(command);
  });
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
      var files = glob.sync(globPatterns, { ignore: excludes });
      
      output = _.union(output, files);
    }
  }
  return output;
}

module.exports = {
  get : get,
  only : only
}
