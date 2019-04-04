/**
 * Routes til produkt adminpanel
 * Heinz K - Marts 2019
 */
const authorize = require('../../middleware/authorize');
const modulename = 'Produkter';

module.exports = (app) => {
    //GET: Henter liste med produkter
    app.get('/admin/product/index', authorize, (req, res) => {
        //let token = jwt.open(req.headers.token);
        //console.log(token);
        res.render('pages/admin/product/index', {
            modulename: modulename,
            modulemode: 'Oversigt'
        }) 
    })

    //GET: Henter enkelt produkt ud fra id
    app.get('/admin/product/details/:id', (req, res) => {
        res.render('pages/admin/product/details', {
            modulename: modulename,
            modulemode: 'Detaljer',
            id: req.params.id
        }) 
    })

    //Opret nyt produkt
    app.get('/admin/product/create', (req, res) => {
        res.render('pages/admin/product/create', {
            modulename: modulename,
            modulemode: 'Opret ny'
        }) 
    });

    //Redigere produkt
    app.get('/admin/product/update/:id', (req, res) => {
        res.render('pages/admin/product/update', {
            modulename: modulename,
            modulemode: 'Rediger',
            id: req.params.id
        }) 
    });    

    //Delete produkt
    app.get('/admin/product/delete/:id', (req, res) => {
        res.render('pages/admin/product/delete', {
            modulename: modulename,
            modulemode: 'Slet mærke',
            id: req.params.id
        }) 
    });     
}