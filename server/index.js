var express = require('express')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var finalhandler = require('finalhandler')

var app = express()


var serve = serveStatic('./musics')
app.use('/', serveIndex('./musics', {'icons': true}))

app.get('/*', function(req, res) {
    serve(req, res, finalhandler(req, res))
});

app.listen(3000,()=>{
	console.log('ok')
})
