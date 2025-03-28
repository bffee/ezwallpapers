const express = require('express');
const {handleGetHomePage} = require('../controllers/home-controller');


const Router = express.Router();

Router
    .route('/')
    .get(handleGetHomePage)


module.exports = Router;