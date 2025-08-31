var jwt = require('jsonwebtoken');

const tokenVerification = (req,res, next) =>{
    const token = req.headers.authorization
    console.log(token);
    
    jwt.verify(token, process.env.jwtToken_code, (err, decoded) =>{
       if(err) return res.status(401).send('Invalid Token');
        
  });
     next()
    
}

module.exports = tokenVerification