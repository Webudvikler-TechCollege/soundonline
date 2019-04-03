const bodyParser = require('body-parser');

module.exports = (app) => {
    /* Body Parser Settings*/
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}