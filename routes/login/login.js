/**
 * Login route med bcrypt & express session
 * 
 */
const mysql = require('../../config/mysql')();
const authorize = require('../../middleware/authorize');
const bcrypt = require('bcrypt');

module.exports = (app) => {

    //Login: Kalder view med login formular
    app.get('/login', (req, res) => {
        res.render('pages/admin/login', {
            vars: {
                modulename: 'Login',
                modulemode: '',
                errormsg: ''
            }
        })
    })

    //Login: Kalder view med login formular
    app.get('/login/:errcode([0-9]*)', (req, res) => {

        res.render('pages/admin/login', {
            modulename: 'Login',
            modulemode: '',
            errormsg: 'Fejlmeddelelse'
        })
    })


    //Verificerer loginoplysninger
    app.post('/login', async (req, res) => {
        //Validate af login form post
        const email = (req.body.email != undefined) ? req.body.email : '';
        const password = (req.body.password != undefined) ? req.body.password : '';

        if(email === '' || password === '') {
            //Return unauthorized
            res.redirect('/login/401');
            //res.sendStatus(401);
        } else {
            //Henter data fra user db
            const sql = "SELECT * FROM user WHERE email = ?";
            await mysql.query(sql, [email], (err, result, fields) => {
                if(result) {
                    //Match form password med db password
                    if(bcrypt.compareSync(password, result[0].password)) {
                        //Sæt session med bruger id
                        req.session.user = result[0].id;
                        //Redirect
                        res.redirect('/authorize');
                    } else {
                        //Return unauthorized
                        res.redirect('/login/401');
                    }
                } else {
                    //Return forbidden
                    res.redirect('/login/403');
                }
            });
        }
    })

    app.get('/authorize', authorize, (req, res) => {
        console.log(req.session.user);
        res.sendStatus(200);
    })
}