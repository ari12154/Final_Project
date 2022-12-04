const main_R = require('../mainRouter')
const user_R = require('../usersRouter')


/* Init */
exports.routesInit = (app) => {
    app.use('/', main_R)
    app.use('/users', user_R)
}