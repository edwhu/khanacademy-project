Conditions:
Whitelist contains code structures that are allowed. Example:
//only variable declaration and for loops allowed
var code = 'for(int i=0;i<3; i++); var foo;'
parse(code,{whitelist:['ForStatement', 'VariableDeclaration']})
