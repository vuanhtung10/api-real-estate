const Token = require('../models/token.model');
const jwt = require('jsonwebtoken');

module.exports.getBearerToken = async function(req) {
    try {
      const authHeader = req.headers["authorization"];
      if (authHeader) {
        const bearerToken = authHeader.split('Bearer ');
        const { JWT_SECRET } = process.env;
        try{
          const decodedToken = await jwt.verify(bearerToken[1], JWT_SECRET);
          const token = await Token.findOne({ token: bearerToken })
          if(!token) return ("Token invalid");
          return decodedToken
        } catch(error){
          return ("Token invalid");
        }
      }
    }
    catch (error) {
      return error;
    }
  }