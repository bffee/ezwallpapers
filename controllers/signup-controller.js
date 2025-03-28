const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Users} = require('../models/users');

// Secret key for JWT
const JWT_SECRET = 'abuzark';

const signupUser = async (req, res) => {

  console.log(req.body)
  console.log(req.file)
  // res.send("user submitted sucessfully")
  const { fname, lname, username, email, password, categories, bio} = req.body;

  try {
    // Check if the email already exists
    const existingUser = await Users.findOne({ $or: [{email}, {username}] });
    if(existingUser){
      if(existingUser?.username == username && existingUser?.email == email){
        return res.status(400).json({ both: true})
      }
      else{
        if (existingUser?.email == email) {
          return res.status(400).json({ email: true });
        }
        else if(existingUser?.username == username){
          return res.status(400).json({ username: true });
        }
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = new Users({
      profilePicture: req?.file ? `/images/profile_pictures/${req.file.filename}` : '/images/profile_pictures/placeholder.jpg',
      fname,
      lname,
      username,
      email,
      password: hashedPassword,
      bio,
      categories: JSON.parse(categories)
    });

    // Save user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '168h' });

    // Set the JWT as a cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts
      secure: true,   // Use this in production with HTTPS
      maxAge: 604800000, // 7 days
    });

    // Respond with success
    // res.status(201).json({ message: 'User registered successfully.' });
    res.redirect('/')
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

module.exports = { signupUser };
