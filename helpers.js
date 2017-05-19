var users = require('./users')

function verifyUser(req, res, next) {
    if (users.list[req.params.username]) {
	next()
    }
    else {
	res.redirect('/error/' + req.params.username)
    }
}

function getUser(username) {
    return users.list[username]
}


exports.verifyUser = verifyUser
exports.getUser = getUser
