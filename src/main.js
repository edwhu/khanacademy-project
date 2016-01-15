var esprima = require('esprima');
var acorn = require('acorn')
var _ = require('lodash');

// Conditions:
// Whitelist contains code structures that are allowed. Example:
// only variable declaration and for loops allowed
// var code = 'for(int i=0;i<3; i++); var foo;'
// parse(code,{whitelist:['ForStatement', 'VariableDeclaration']})
//structure: [ [ { outer: 'VariableDeclaration', level: 1 },
/*    { outer: 'VariableDeclarator', level: 2 },
    { outer: 'Identifier', level: 3 } ],
  [ { outer: 'VariableDeclaration', level: 1 },
    { outer: 'VariableDeclarator', level: 2 },
    { outer: 'Identifier', level: 3 } ] ]*/
function parse(string, conditions, callback) {
  var whitelist = conditions.whitelist;
  var blacklist = conditions.blacklist;
  var structureList = conditions.structure;
  var tree = esprima.parse(string);

  //console.log(JSON.stringify(tree, null, '\t'));
  //explore the tree and check for conditions
  var whiteResult = 0;
  var blackResult = 0;


  var structureArray = [];

  function recursiveExplorer(obj, level, current) {
    //if it has a title key, we need to check it and update the results
    if (obj.type) {
      current.push({
        outer: obj.type,
        level: level
      });
      //either we make a new key or add it into the current structure
      if (whitelist.indexOf(obj.type) > -1) {
        whiteResult++;
      }
      if (blacklist.indexOf(obj.type) > -1) {
        blackResult++;
      }
      level++;
    }
    //now we need to  explore the rest
    for (var k in obj) {
      if (typeof obj[k] == 'object' && obj[k] !== null) {

        recursiveExplorer(obj[k], level, current);
      }
    }
  } //end recursiveExplorer
  recursiveExplorer(tree, 0, structureArray);

  //splice the array to get rid of extraneous 'Program' object
  structureArray.splice(0, 1);
  //console.log(structureArray, structureArray.length);

  var foo = [];
  structureArray.reduce(function(a, e, i) {
    if (e.level === 1) {
      a.push(i);
    }
    return a;
  }, foo);

  structureArray = foo.map(function(curr, i) {
    if (i + 1 <= foo.length) {
      return structureArray.slice(foo[i], foo[i + 1]);
    }
  })
  console.log(structureArray);
  //push in whitelist / blacklist / structure results
  var booo = true;
      //we need to check if EVERY codeblock in the structureList exists in some form in the structureArray. if so, then we have a valid structure.
  if (structureList.length != 0) {
    var booo = structureList.every(function(codeBlock){
      return structureArray.some(function(goodCodeBlock){
        return _.isEqual(codeBlock,goodCodeBlock);
      })
    });

  }
  var results = {
    whitelist: whiteResult,
    blacklist: blackResult,
    structure: booo,
    tree:tree
  };
  callback(results);
}

// parse('if(5)', {
//   whitelist: ['Literal'],
//   blacklist: ['ForStatement'],
//   structure: []
// }, function(x) {
//   console.log('conditions', x);
// });

module.exports.parse = parse;
