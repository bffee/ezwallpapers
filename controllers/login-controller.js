const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Users} = require('../models/users');

// Secret key for JWT
const JWT_SECRET = 'abuzark';

const loginUser = async (req, res) => {
  const { loginUsername, loginPassword } = req.body;
  console.log(req.body)

  try {
    // Check if the user exists
    const user = await Users.findOne({ username: loginUsername });
    console.log(loginUsername)
    console.log(loginPassword)
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '168h' });

    // Set the JWT as a cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts
      secure: true,   // Use this in production with HTTPS
      maxAge: 604800000, // 7 days
    });

    // Respond with success
    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

module.exports = { loginUser };
