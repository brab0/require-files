var _ = require('lodash'),
 glob = require('glob');

var _this = this;

function get(globPatterns, excludes) {

  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  var output = [];

  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, _this.getFilesIn(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};

function only(path, excludes){
  get(process.cwd() + '/' + path, excludes).forEach(command => {
      require(command);
  });
}

module.exports = {
  all : all,
  only : only
}
