/**
 * Routes til user adminpanel
 * Heinz K - Marts 2019
 */
const modulename = 'Brugere';

module.exports = (app) => {
    //Henter liste
    app.get('/admin/user/index', (req, res) => {    
        res.render('pages/admin/user/index', {
            modulename: modulename,
            modulemode: 'Oversigt'
        }) 
    })

    //Henter enkelt record ud fra id
    app.get('/admin/user/details/:id', (req, res) => {
        res.render('pages/admin/user/details', {
            modulename: modulename,
            modulemode: 'Detaljer',
            id: req.params.id
        }) 
    })

    //Opret nyt brand
    app.get('/admin/user/create', (req, res) => {
        res.render('pages/admin/user/create', {
            modulename: modulename,
            modulemode: 'Opret ny'
        }) 
    });

    //Redigere brand
    app.get('/admin/user/update/:id', (req, res) => {
        res.render('pages/admin/user/update', {
            modulename: modulename,
            modulemode: 'Rediger',
            id: req.params.id
        }) 
    });    

    //Delete brand
    app.get('/admin/user/delete/:id', (req, res) => {
        res.render('pages/admin/user/delete', {
            modulename: modulename,
            modulemode: 'Slet bruger',
            id: req.params.id
        }) 
    });     
}