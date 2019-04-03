const mysql = require('../../config/mysql')();

module.exports = (app) => {

    //Get all 
    app.get('/api/brands', function(req, res) {

        const sql = "SELECT id, title, description FROM brand";
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
    app.get('/api/brand/:id([0-9]*)', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            const sql = `SELECT title, description  
                            FROM brand 
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
    app.post('/api/brand', (req, res) => {

        let title = (req.body.title === undefined) ? '' : req.body.title;
        let description = (req.body.description === undefined) ? '' : req.body.description;

        if(title === '' || description === '') {
            res.sendStatus(418);
        } else {
            const sql = `INSERT INTO brand(title, description) 
                            VALUES(?,?)`;
            mysql.query(sql, [title, description], (err, result) => {
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
    app.put('/api/brand/:id', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            let title = (req.body.title === undefined) ? '' : req.body.title;
            let description = (req.body.description === undefined) ? '' : req.body.description;
    
            if(title === '' || description === '') {
                res.sendStatus(418);
            } else {
                const sql = `UPDATE brand SET 
                                title = ?, 
                                description = ? 
                                WHERE id = ?`;
                mysql.query(sql, [title, description, req.params.id], (err, result) => {
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
    app.delete('/api/brand/:id', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            const sql = `DELETE FROM brand WHERE id = ?`;
            mysql.query(sql, [req.params.id], (err, result) => {
                if(err) {
                    console.error(err);
                } else {
                    res.sendStatus(200);
                }
            })    

        }
    })

    //Henter sidst indsatte id.
    //Bruges til at hente id når der er oprettet en ny record
    app.get('/api/brand/getinsertid', (req, res) => {
        const sql = `SELECT MAX(id) AS newid FROM brand`;
        mysql.query(sql, (err, result) => {
            if(err) {
                console.error(err);
            } else {
                res.json(result);
            }
        })    
    })    
}