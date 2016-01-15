var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var main = require('./src/main.js');
var app = express();

var port = process.env.PORT || 3000;
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api', function(req, res) {
  var data = req.body.data.toString().trim();
  //change the condition object to your liking! Default condition should be
  //{whitelist:[], blacklist:[], structure: []}
  main.parse(data, {
      whitelist: ['WhileStatement'],
      blacklist: ['ForStatement'],
      structure: [
        [{
          type: 'WhileStatement',
          level: 1
        }, {
          type: 'Literal',
          level: 2
        }, {
          type: 'BlockStatement',
          level: 2
        }, {
          type: 'IfStatement',
          level: 3
        }, {
          type: 'Literal',
          level: 4
        }, {
          type: 'BlockStatement',
          level: 4
        }],
        [{
          type: 'EmptyStatement',
          level: 1
        }]
      ]

    },
    function(results) {
      console.log(results);
      res.send(results);
    });


});
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
