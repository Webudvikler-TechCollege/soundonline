//Middleware funktion til at tjekke brugers login status med
module.exports = authorize;

async function authorize(req, res, next) {
    console.log('Session:' + req.session.user);
    if(!req.session.user) return res.redirect('/login');
    next();
}