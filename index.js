var http = require('http')

var express = require('express')

var app = express()

var JSONStream = require('JSONStream')
var fs = require('fs')
var engines = require('consolidate')
var bodyParser = require('body-parser')
var helpers = require('./helpers')
var users = require('./users')

app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(bodyParser())

app.get('/', function(req, res) {
    res.render('index', {users: users.list})
})

app.get('/users/by/:state', function(req, res) {
    var state = req.params.state
    var rstream = fs.createReadStream('./users.json')

    rstream
	.pipe(JSONStream.parse('*', function(user) {
	    if (user.address.state === state) return user
	}))
	.pipe(JSONStream.stringify('[\n ', ',\n ', '\n]\n'))
	.pipe(res)
})

app.get('/data/:username', function(req, res) {
    var username = req.params.username
    var user = helpers.getUser(username)
	var full = user.name.full;
    res.send(full)
})

app.get('/passage/:book/:chapter', (req, res) => {
	var ref = req.params.book + '/' + req.params.chapter;
	var options = {
		host: 'memorize.toewsweb.net',
		path: '/rest.php/getpassage/' + ref
	};

	var callback = (response) => {
		var str = '';
		response.on('data', (chunk) => {
			str += chunk;
		});
		response.on('end', () => {
			var output = JSON.parse(str);
			res.render('passage', {passage: output})
		});
	};

	http.request(options, callback).end();
})

app.get('*.json', function(req, res) {
    res.download('./')
})

app.get('/error/:username', function(req, res) {
    res.status(404).send('Error: user ' + req.params.username + ' not found.')
})

var userRouter = require('./username')
console.log('Router', userRouter)
app.use('/:username', userRouter)

var server = app.listen(3000, function() {
    console.log('Server running at http://localhost:' + server.address().port)
})
