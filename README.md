<h1>Code Editor and Tester</h1>
<ul>
  <li>non blocking processing due to callback nature of node</li>
  <li>functional approach to this code challenge</li>
  <li>use of esprima in server backend instead of browser minimizes compatibility issues</li>
</ul>
<br>Powered by Node.js

#Parse function
Processes and delivers results of code in a callback. Returns number of code structures in whitelist,
number of code structures in blacklist, and if code has structures identical to a given structure.

1st argument: user data in a string
2nd argument: condition object that takes in a whitelist array, blacklist array, and a structure array.
3rd argument: callback to manipulate results

``` js
//takes in user input data as a string, an object that contains the properties, and a callback
//userinput: the string of user code
//conditions: {whitelist: ['ForStatement'], blacklist: ['WhileStatement'], structure:[[{type:'WhileStatement', level:1}]]
parse("while(1){if(1){}}",
{whitelist:['WhileStatement'],blacklist:['ForStatement'],structure:[[{type:'WhileStatement', level:1}]]},
function(results){
  console.log(results);
  });
//outputs 1,0,true
```
