const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

//Set port
app.set('port', port);
//Set view engine to ejs
app.set('view engine', 'ejs');
//Set view directory (__dirname => DOCUMENT_ROOT)
app.set('views', __dirname + '/views');
app.set('view options', {layout:false, root: __dirname + '/views' });
//Set static path
app.use(express.static(__dirname + '/'));

//Requires
require('./routes/index')(app);

//Angiver en listener på port 4000
app.listen(port, () => {
    console.log(`Express server started http://localhost:${port}`);
});