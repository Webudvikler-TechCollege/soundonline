/**
 * Express Session Settings
 */
const session = require('express-session');

module.exports = (app) => {
    app.use(session({
        resave: true,
        saveUninitialized: true,
        httpOnly: true,
        secret: process.env.SESSION_SECRET || 'blowfishsecret',
    }));
}