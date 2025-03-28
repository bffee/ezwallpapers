const jwt = require('jsonwebtoken');
const {Users} = require('../models/users');

// Secret key for JWT
const JWT_SECRET = 'abuzark';

const checkAuthentication = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req?.cookies?.authToken;
    
    // If no token is present, the user is not authenticated
    if (token) {
      // return res.status(401).json({ message: 'Access denied. No token provided.' });
          // Verify the token
          const decodedToken = jwt.verify(token, JWT_SECRET);
      
          // Find the user associated with the token
          const user = await Users.findById(decodedToken.id, {email: 0, password: 0}).lean();
          if (!user) {
            res.clearCookie("authToken")
            req.user = null
            return next()
            // return res.status(401).json({ message: 'Authentication failed. User not found.' });
          }
          user._id = user._id.toString();
      
          // Attach the user to the request object
          req.user = user;
          // console.log("printing the req.user")
          // console.log(req.user);
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.', error: error.message });
  }
};

module.exports = { checkAuthentication };

