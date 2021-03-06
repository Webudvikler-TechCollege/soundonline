const mysql = require('../../config/mysql')();
const bcrypt = require('bcrypt');

module.exports = (app) => {

    //Get all 
    app.get('/api/user', function(req, res) {
        const sql = "SELECT id, firstname, lastname, email FROM user";
        mysql.query(sql, (err, rows, fields) => {
            if(err) {
                console.error(err);
            } else {
                return res.json(rows);
            }
        })
    });

    //Get single item - nu med regex på route, som sikrer
    //at denne route kun kan kaldes med et tal som endpoint
    app.get('/api/user/:id([0-9]*)', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            const sql = `SELECT firstname, lastname, email  
                            FROM user 
                            WHERE id = ?`;
            mysql.query(sql, [req.params.id], (err, result) => {
                if(err) {
                    console.error(err);
                } else {
                    return res.json(result);
                }
            });
        }
    })
    
    //Opretter ny record og returnerer
    app.post('/api/user', async (req, res) => {

        let firstname = (req.body.firstname === undefined) ? '' : req.body.firstname;
        let lastname = (req.body.lastname === undefined) ? '' : req.body.lastname;
        let email = (req.body.email === undefined) ? '' : req.body.email;
        let password = (req.body.password === undefined) ? '' : req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        if(firstname === '' || lastname === '' || email === '' || password === '') {
            res.sendStatus(418);
        } else {
            const sql = `INSERT INTO user(firstname, lastname, email, password) 
                            VALUES(?,?,?,?)`;
            const params = [firstname, lastname, email, hash];

            mysql.query(sql, params, (err, result) => {
                if(err) {
                    console.error(err);
                } else {
                    //Husk at sende som objekt :}
                    res.send({id: result.insertId});
                }
            })

        }
    })
    
    //Update item
    app.put('/api/user/:id', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            let firstname = (req.body.firstname === undefined) ? '' : req.body.firstname;
            let lastname = (req.body.lastname === undefined) ? '' : req.body.lastname;
            let email = (req.body.email === undefined) ? '' : req.body.email;
            let password = (req.body.password === undefined) ? '' : req.body.password;
    
            if(firstname === '' || lastname === '' || email === '' || password === '') {
                res.sendStatus(418);
            } else {
                const sql = `UPDATE user SET 
                                firstname = ?, 
                                lastname = ?,
                                email = ?, 
                                password = ? 
                                WHERE id = ?`;
                const params = [firstname, lastname, email, password, req.params.id];
                console.log(params);
                mysql.query(sql, params, (err, result) => {
                    if(err) {
                        console.error(err);
                    } else {
                        res.sendStatus(200);
                    }
                })    
            }
        }        
    })
    
    //Delete item
    app.delete('/api/user/:id', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            const sql = `DELETE FROM user WHERE id = ?`;
            mysql.query(sql, [req.params.id], (err, result) => {
                if(err) {
                    console.error(err);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
}