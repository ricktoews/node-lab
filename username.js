var express = require('express')
var helpers = require('./helpers')

var router = express.Router({ mergeParams: true })

router.all('/', function(req, res, next) {
    console.log(req.method, 'for', req.params.user)
    next()
})

router.get('/', helpers.verifyUser, function(req, res) {
    var username = req.params.username
    var user = helpers.getUser(username)
    res.render('user', {username: username, user: users[username], address: users[username].address})
})

router.put('/', function(req, res) {
    console.log('what is being put (params)', req.params)
    console.log('what is being put (body)', req.body)
    res.end()
})

module.exports = router
