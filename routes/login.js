const mysql = require('../config/mysql')();
const jwt = require('../config/jwt');

module.exports = (app) => {
    //Login: Returnerer view med login formular
    app.get('/loginform', (req, res) => {
        res.render('pages/admin/loginform', {
            modulename: 'Login',
            modulemode: ''
        })
    })

    //Login: Tjekker bruger login og returnerer jsonwebtoken hvis alt er godt
    app.post('/login', (req, res) => {
        //Henter data fra login formular
        const email = (req.body.email != undefined) ? req.body.email : '';
        const password = (req.body.password != undefined) ? req.body.password : '';

        //Validerer input data
        if(email === '' || password === '') {
            res.sendStatus(400);
        } else {
            //Tjekker om bruger findes i user db
            const sql = "SELECT id FROM user WHERE email = ? AND password = ?";
            mysql.query(sql, [email, password], (err, result, fields) => {
                if(err) {
                    //DB Fejl: Internal Server Error
                    res.sendStatus(500);
                } else {
                    if(!result[0]) {
                        //Unauthorized
                        res.sendStatus(401);
                    } else {
                        //Ok
                        let token = jwt.create({ id: result[0].id });
                        res.json({ token: token });
                    }
                }
            });
        }
    })
}