var fs = require('fs')
var _ = require('lodash')

var users = {}

fs.readFile('users.json', {}, function(er, data) {
    if (er) throw err

    JSON.parse(data).forEach(function(user) {
	var key = user.username
	user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
	users[key] = user
    })
})

exports.list = users
