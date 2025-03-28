const express = require('express');
const {handleGetSearchPage} = require('../controllers/search-controller');


const Router = express.Router();

Router
    .route('/')
    .get(handleGetSearchPage)


module.exports = Router;