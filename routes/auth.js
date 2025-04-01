const express = require('express');
const upload = require('../middlewares/profile-picture-upload');
const {handleGetAuthenticationPage} = require('../controllers/auth-controller');
const {signupUser} = require('../controllers/signup-controller');
const {loginUser} = require('../controllers/login-controller');


const Router = express.Router();

Router
    .route('/:form')
    .get(handleGetAuthenticationPage)
    
Router
    .route('/login')
    .post(loginUser)
    
Router.post('/signup', upload.single('profilePicture'), signupUser)
    
    
module.exports = Router;