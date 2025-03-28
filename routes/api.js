const express = require('express');
const {handleGetAPI} = require('../controllers/api-controller')

const Router = express.Router();

Router
    .route('/')
    .get(handleGetAPI)

module.exports = Router;