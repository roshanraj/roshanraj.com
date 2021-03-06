//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    morgan  = require('morgan');


app.use(morgan('combined'))


app.use('/work/ict/demo', express.static('webapp/project/learn-pad'));
app.use('/work/menias/demo', express.static('webapp/project/menias'));

app.use(express.static('webapp'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


app.get('/', function (req, res) {
     res.sendfile('./webapp/index.html');
});

app.get('/service/get', function (req, res) {
     res.send("get request");
});


app.get('/work/menias/demo', function (req, res) {
     res.sendfile('./webapp/project/menias/index.html');
});

app.get('/work/ict/demo', function (req, res) {
     res.sendfile('./webapp/project/learn-pad/index.html');
});


app.post('/service/post', function (req, res) {
     res.send("post request");
});

app.get('*', function(req, res) {
     res.sendfile('./webapp/index.html');
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});





app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
