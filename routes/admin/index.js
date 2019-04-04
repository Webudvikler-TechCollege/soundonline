/**
 * Routes til user adminpanel
 * Heinz K - Marts 2019
 */
const authorize = require('../../middleware/authorize');
const modulename = 'Brugere';

module.exports = (app) => {
    //Henter liste
    app.get('/admin/', authorize, (req, res) => {    
        res.render('pages/admin/index', {
            modulename: modulename,
            modulemode: 'Oversigt'
        }) 
    })
}