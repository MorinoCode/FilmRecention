
import jwt from 'jsonwebtoken'


const isUserLogin = async  ( req , res ,next ) => {
  
    try{

        // Kontrollera om header finns
            if (!req.headers.authorization) {
              return res.status(401).json([{ message: "Ingen token angiven" }]);
            }
        
            // Hämta token och ta bort "Bearer "
            const token = req.headers.authorization.split(" ")[1];
     
            // Kontrollera om token existerar
            if (!token) {
              return res.status(401).json([{ message: "Token saknas" }]);
            }
        
            // Verifiera token

            const isTokenValid = jwt.verify(token, process.env.SECRET_KEY);
        
            if (!isTokenValid) {
              return res.status(403).send([{ message: "Token är inte giltig" }]);
            }
        
            req.user = isTokenValid;
           
        
            next();

    } catch (err) {
      
        return res.status(401).json([{ message: "Ogiltig eller utgången token" }]);
    }
}

export default isUserLogin