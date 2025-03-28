const express = require('express');
const {handleGetProfilePage} = require('../controllers/profile-controller');

const Router = express.Router();

Router
    .route('/@:user')
    .get(handleGetProfilePage)

module.exports = Router;