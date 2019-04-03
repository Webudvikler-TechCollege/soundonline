/**
 * Automatisk require af config filer
 */
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    //Looper config dir
    fs.readdirSync(__dirname, {
        withFileTypes: true
    }).forEach(file => {
        if (file.name !== path.basename(__filename)) {
            try {
                if(file.name.substr(0,1) != '_') {
                    require(path.join(__dirname,file.name))(app);
                    //console.log(path.join(__dirname,file.name));
                }
            } catch (error) {
                console.error(error); 
            }
        }
    })
}