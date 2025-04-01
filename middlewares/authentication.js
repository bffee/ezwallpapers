const jwt = require('jsonwebtoken');
const {Users} = require('../models/users');
const {JWT_SECERET} = require('../config/config');

const checkAuthentication = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req?.cookies?.authToken;
    
    // If no token is present, the user is not authenticated
    if (token) {
          // Verify the token
          const decodedToken = jwt.verify(token, JWT_SECERET);
      
          // Find the user associated with the token
          const user = await Users.findById(decodedToken.id, {email: 0, password: 0}).lean();
          if (!user) {
            res.clearCookie("authToken")
            req.user = null
            return next()
          }
          user._id = user._id.toString();
          req.user = user;
    }
    // Proceed to the next middleware or route handler
    next();
  } 
  catch (error) {
    res.clearCookie("authToken")
    req.user = null
    return next()
  }
};

module.exports = { checkAuthentication };

