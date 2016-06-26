module.exports = function(fileInfo, api, options) {
  var j = api.jscodeshift;
  
  var root = j(fileInfo.source);

  var plusplusCallBacks = root
    .find(j.ForStatement, {
      update: {
        type: "UpdateExpression",
        operator: "++",
        prefix: false
      }
    })
    .forEach(function(path) {
      path.value.update.prefix = true;
    })
    .size() > 0;

  var minusminusCallBacks = root
    .find(j.ForStatement, {
      update: {
        type: "UpdateExpression",
        operator: "--",
        prefix: false
      }
    })
    .forEach(function(path) {
      path.value.update.prefix = true;
    })
    .size() > 0


  return plusplusCallBacks || minusminusCallBacks ? root.toSource() : null;
};
