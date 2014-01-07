var express = require('express');
var app = express();

/*
app.get('/', function(req, res){
	res.send('hello world');
});
*/

app.use(express.logger());
app.use(express.static(__dirname + '/../public'))
app.listen(3000);