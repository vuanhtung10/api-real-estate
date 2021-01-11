const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const Users = require('../models/user.model');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

require('dotenv').config();
const { JWT_SECRET: secretOrKey } = process.env;

class JWTService {

  static generateTokenByUser(user) {
    if (!user) {
      return false;
    }

    const { 
      _id, 
        full_name, 
        email,
        role, 
        age,
        sex,
        birthday,
        adress,
        create_at,
        update_at
    } = user;

    return jwt.sign(
      {  _id, 
        full_name, 
        email,
        role, 
        age,
        sex,
        birthday,
        adress,
        create_at,
        update_at
      },
      secretOrKey,
      { expiresIn:  168 * 60 * 60 }
    );
  }

  static get JWTStrategy() {
    return new JwtStrategy(
      { jwtFromRequest, secretOrKey, passReqToCallback: true },
      async (req, jwtPayload, next) => {
        const { _id } = jwtPayload;
        
        try {
          const user = await Users.findOne({ _id });
          return next(null, user || false);
        } 
        catch (error) {
          return next(null, false);
        }
      });
  }
}

module.exports = JWTService;