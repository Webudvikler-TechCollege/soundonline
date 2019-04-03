const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

/* Requires */
require('./config/index')(app);
require('./routes/index')(app);

//Angiver en listener på port 4000
app.set('port', port);
app.listen(port, () => {
    console.log(`Express server started http://localhost:${port}`);
});