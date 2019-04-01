/**
 * Automatisk require af routes
 * Alle nødvendige routes bør ligge i en undermappe (api, admin, auth)
 */
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    //Looper routes dir
    fs.readdirSync(__dirname, {
        withFileTypes: true
    }).forEach(dir => {
        //Tjekker om fil er et dir
        let curpath = path.join(__dirname, dir.name);
        let stat = fs.statSync(curpath);
        //Hvis fil er et dir
        if(stat.isDirectory()) {
            //Lær dir
            fs.readdirSync(curpath, {
                withFileTypes: true
            }).forEach(file => {
                //Require fil
                if(file.name !== path.basename) {
                    try {
                        require(path.join(curpath,file.name))(app);
                    } catch (error) {
                        console.error(error);
                    }
                } 
            })
        }
    })
}