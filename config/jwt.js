// indlæs json web token modulet
const jwt = require('jsonwebtoken');

// denne streng benyttes til at kryptere indholdet af en token
// ændres denne, kan gamle tokens ikke åbnes igen.
const privateKey = 'La3ZvKF4V/A3GoKomgT0';

module.exports = {
   // denne funktion opretter selve token objektet, krypteret med vores private nøgle
   create: (data) => {
      return jwt.sign(data, privateKey, { expiresIn: 60 * 60 * 24 }); // levetid 24 timer
   },

   // denne funktion benyttes til at åbne en token, og returnere den data der gemt i den
   open: (token) => {
      // hvis token ikke findes, returneres false
      if (token == undefined) {
         return false;
      } else {
         // her benyttes en try - catch til at pakke token ud
         try {
            let decoded = jwt.verify(token, privateKey);
            // console.log(decoded);
            return decoded;
         } catch (err) {
            // hvis noget ikke stemmer overens havner vi her i fejlbeskeden
            // det kunne være at token strengen er ændret på klient siden, 
            // eller at tiden er udløbet 
            console.log(err.message);
            // returner false.
            return false;
         }
      }
   }
};