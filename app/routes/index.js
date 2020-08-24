module.exports = function(app) {
	app.use('/api/admin', require('./admin/admin'))
	app.use('/api/result',require('./admin/dashboard'))
	app.use('/api/quiz',require('./admin/quiz'))
	app.use('/api/user',require('./user/user'))
}