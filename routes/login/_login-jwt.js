const mysql = require('../../config/mysql')();
const jwt = require('jsonwebtoken');
const authorized = require('../../middleware/authorize');

module.exports = (app) => {

    //Login: Returnerer view med login formular
    app.get('/login', (req, res) => {
        res.render('pages/admin/login', {
            modulename: 'Login',
            modulemode: ''
        })
    })

    app.get('/test', authorize, (req, res) => {
        res.sendStatus(200);
    })

    app.get('/protected', authorize, (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, data) => {
            if(err) {
                res.sendStatus(403);
            } else {
                res.json({
                    text: 'this is protected',
                    data: data
                })
            }
        })
    })

    /*
    function authorize(req, res, next) {
        const baererHeader = req.headers['authorization'];
        if(typeof baererHeader != 'undefined') {
            const baerer = baererHeader.split(" ");
            const baererToken = baerer[1];
            req.token = baererToken;
            next();
        } else {
            res.sendStatus(403);
        }
        return module.exports;
    } 
    */

    //Login: Tjekker bruger login og returnerer jsonwebtoken hvis alt er godt
    app.post('/login', (req, res) => {
        //Henter data fra login formular
        const email = (req.body.email != undefined) ? req.body.email : '';
        const password = (req.body.password != undefined) ? req.body.password : '';
        //Validerer input data
        if(email === '' || password === '') {
            console.log(111);
            res.sendStatus(400);
        } else {
            //Tjekker om bruger findes i user db
            const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
            mysql.query(sql, [email, password], (err, result, fields) => {
                if(err) {
                    //DB Fejl: Internal Server Error
                    res.sendStatus(500);
                } else {
                    if(!result[0]) {
                        //Unauthorized
                        res.sendStatus(401);
                    } else {
                        const token = jwt.sign( { id: result[0].id }, result[0].secret);
                        res.json({
                            token: token
                        })
                    }
                }
            });
        }
    })
}