<h1>Code Editor and Tester</h1>
<ul>
  <li>non blocking processing due to callback nature of node</li>
  <li>functional approach to this code challenge</li>
  <li>use of esprima in server backend instead of browser minimizes compatability issues</li>
</ul>
<br>Powered by Node.js

Core API:
'''js
//takes in user input data as a string, an object that contains the properties, and a callback
//userinput: the string of user code
//conditions: {whitelist: ['ForStatement'], blacklist: ['WhileStatement'], structure:[[{type:'WhileStatement', level:1}]]
parse("while(1){if(1){}}",
{whitelist:['WhileStatement'],blacklist:['ForStatement'],structure:[[{type:'WhileStatement', level:1}]]},
function(results){
  console.log(results);
  });
//outputs 1,0,true
'''
parse(userinput, conditions, callback)
