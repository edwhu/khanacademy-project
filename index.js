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
  main.parse(data, {
      whitelist: ['WhileStatement'],
      blacklist: ['ForStatement'],
      structure: [
        [{
          outer: 'WhileStatement',
          level: 1
        }, {
          outer: 'Literal',
          level: 2
        }, {
          outer: 'BlockStatement',
          level: 2
        }, {
          outer: 'IfStatement',
          level: 3
        }, {
          outer: 'Literal',
          level: 4
        }, {
          outer: 'BlockStatement',
          level: 4
        }],
        [{
          outer: 'EmptyStatement',
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
